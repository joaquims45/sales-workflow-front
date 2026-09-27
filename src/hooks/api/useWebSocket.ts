import { useEffect, useRef, useState } from "react";

export type ConnectionState = "connecting" | "open" | "closed" | "error";

const MAX_BACKOFF_MS = 10_000;

// Generic WebSocket subscription with auto-reconnect (exponential backoff,
// capped at 10s, reset on a successful open). `url` null means "don't
// connect yet" (e.g. waiting for a conversation id) — the effect just skips
// and reports "closed".
export function useWebSocket(url: string | null, onMessage: (data: unknown) => void) {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const [status, setStatus] = useState<ConnectionState>("closed");

  useEffect(() => {
    if (!url) {
      setStatus("closed");
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let attempt = 0;
    let cancelled = false;

    const connect = () => {
      setStatus("connecting");
      socket = new WebSocket(url);

      socket.onopen = () => {
        attempt = 0;
        setStatus("open");
      };

      socket.onmessage = (event) => {
        try {
          onMessageRef.current(JSON.parse(event.data));
        } catch {
          // Malformed frame — ignore rather than crash the subscriber.
        }
      };

      socket.onerror = () => {
        setStatus("error");
      };

      socket.onclose = () => {
        if (cancelled) return;
        setStatus("closed");
        const delay = Math.min(1000 * 2 ** attempt, MAX_BACKOFF_MS);
        attempt += 1;
        reconnectTimeout = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      socket?.close();
    };
  }, [url]);

  return { status };
}
