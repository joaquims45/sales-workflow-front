import { useState } from "react";

import { listConversations } from "@/services/conversationsService";
import type { Conversation } from "@/types/sales";

import { styles } from "../styles";

interface ConversationSwitcherProps {
  conversationId: number | null;
  onSwitch: (conversationId: number) => void;
  onStartNew: () => void;
}

export function ConversationSwitcher({ conversationId, onSwitch, onStartNew }: ConversationSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleOpen() {
    if (!isOpen) {
      setIsLoading(true);
      listConversations()
        .then(setConversations)
        .finally(() => setIsLoading(false));
    }
    setIsOpen((previous) => !previous);
  }

  return (
    <div style={styles.switcher}>
      <div style={styles.switcherBar}>
        <span>Conversación #{conversationId ?? "…"}</span>
        <button type="button" onClick={onStartNew}>
          Nueva conversación
        </button>
        <button type="button" onClick={toggleOpen}>
          {isOpen ? "Cerrar" : "Ver conversaciones"}
        </button>
      </div>

      {isOpen && (
        <div style={styles.switcherList}>
          {isLoading && <p>Cargando…</p>}
          {!isLoading && conversations.length === 0 && <p>No hay conversaciones todavía.</p>}
          {!isLoading &&
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => {
                  onSwitch(conversation.id);
                  setIsOpen(false);
                }}
                style={conversation.id === conversationId ? styles.switcherItemActive : styles.switcherItem}
              >
                #{conversation.id} — {new Date(conversation.created_at).toLocaleString()}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
