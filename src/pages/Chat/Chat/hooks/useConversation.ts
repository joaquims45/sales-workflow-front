import { useCallback, useEffect, useState } from "react";

import {
  createConversation,
  getConversation,
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
  startNewConversation: () => void;
  switchConversation: (conversationId: number) => void;
}

export function useConversation(): UseConversationResult {
  const [conversationId, setConversationId] = useState<number | null>(() => getStoredConversationId());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Single source of truth: whenever conversationId is unset, create one;
  // whenever it's set (on mount from localStorage, or after switching),
  // (re)load its message history — this is also what makes a refresh not
  // lose the conversation's history.
  useEffect(() => {
    if (conversationId === null) {
      createConversation()
        .then((conversation) => {
          storeConversationId(conversation.id);
          setConversationId(conversation.id);
        })
        .catch(() => setError("No pudimos iniciar la conversación. Recargá la página."));
      return;
    }

    getConversation(conversationId)
      .then((conversation) => setMessages(conversation.messages))
      .catch(() => setError("No pudimos cargar la conversación."));
  }, [conversationId]);

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

  const switchConversation = useCallback((newConversationId: number) => {
    setError(null);
    storeConversationId(newConversationId);
    setConversationId(newConversationId);
  }, []);

  const startNewConversation = useCallback(() => {
    setError(null);

    createConversation()
      .then((conversation) => {
        storeConversationId(conversation.id);
        setConversationId(conversation.id);
      })
      .catch(() => setError("No pudimos crear una nueva conversación."));
  }, []);

  return {
    conversationId,
    messages,
    isSending,
    error,
    sendMessage,
    startNewConversation,
    switchConversation,
  };
}
