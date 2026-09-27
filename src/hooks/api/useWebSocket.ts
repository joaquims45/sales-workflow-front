import { useEffect, useRef } from "react";

// Generic WebSocket subscription. `url` null means "don't connect yet"
// (e.g. waiting for a conversation id) — the effect just skips.
export function useWebSocket(url: string | null, onMessage: (data: unknown) => void) {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!url) return;

    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        onMessageRef.current(JSON.parse(event.data));
      } catch {
        // Malformed frame — ignore rather than crash the subscriber.
      }
    };

    return () => {
      socket.close();
    };
  }, [url]);
}
