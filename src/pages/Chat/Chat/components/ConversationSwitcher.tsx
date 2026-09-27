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
        <span style={styles.switcherLabel}>Conversation #{conversationId ?? "…"}</span>
        <button type="button" style={styles.switcherButton} onClick={onStartNew}>
          New conversation
        </button>
        <button type="button" style={styles.switcherButton} onClick={toggleOpen}>
          {isOpen ? "Close" : "Switch conversation"}
        </button>
      </div>

      {isOpen && (
        <div style={styles.switcherList}>
          {isLoading && <p style={styles.switcherHint}>Cargando…</p>}
          {!isLoading && conversations.length === 0 && (
            <p style={styles.switcherHint}>No hay conversaciones todavía.</p>
          )}
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
