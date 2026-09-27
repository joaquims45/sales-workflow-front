import { useCallback, useEffect, useRef, useState } from "react";

import {
  createConversation,
  getStoredConversationId,
  postMessage,
  storeConversationId,
} from "@/services/conversationsService";
import type { Message } from "@/types/sales";

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

    const storedId = getStoredConversationId();
    if (storedId !== null) {
      setConversationId(storedId);
      return;
    }

    createConversation()
      .then((conversation) => {
        storeConversationId(conversation.id);
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
