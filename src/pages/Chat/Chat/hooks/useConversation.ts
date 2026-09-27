import { useCallback, useEffect, useRef, useState } from "react";

import { createConversation, postMessage } from "@/services/conversationsService";
import type { Message } from "@/types/sales";

// Keeps talking to the same Conversation across page refreshes.
const STORAGE_KEY = "sales-workflow:conversation-id";

interface UseConversationResult {
  conversationId: number | null;
  messages: Message[];
  isSending: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
}

export function useConversation(): UseConversationResult {
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const storedId = localStorage.getItem(STORAGE_KEY);
    if (storedId) {
      setConversationId(Number(storedId));
      return;
    }

    createConversation()
      .then((conversation) => {
        localStorage.setItem(STORAGE_KEY, String(conversation.id));
        setConversationId(conversation.id);
      })
      .catch(() => setError("No pudimos iniciar la conversación. Recargá la página."));
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (conversationId === null) return;

      setIsSending(true);
      setError(null);

      postMessage(conversationId, content)
        .then((response) => {
          setMessages((previous) => [...previous, ...response.messages]);
        })
        .catch(() => setError("No pudimos enviar el mensaje. Intentá de nuevo."))
        .finally(() => setIsSending(false));
    },
    [conversationId],
  );

  return { conversationId, messages, isSending, error, sendMessage };
}
