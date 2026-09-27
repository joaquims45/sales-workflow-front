import { useEffect, useRef } from "react";

import type { Message as MessageType } from "@/types/sales";

import { styles } from "../styles";
import { Message } from "./Message";

export function MessageList({ messages, isSending }: { messages: MessageType[]; isSending: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, isSending]);

  if (messages.length === 0 && !isSending) {
    return (
      <div style={styles.messageListEmpty}>
        <p style={styles.messageListEmptyText}>Contale al asistente qué estás buscando.</p>
      </div>
    );
  }

  return (
    <div style={styles.messageList}>
      {messages.map((message) => (
        <Message key={message.id} role={message.role} content={message.content} created_at={message.created_at} />
      ))}
      {isSending && (
        <div style={{ ...styles.message, ...styles.messageAgent }}>
          <div style={styles.messageMeta}>
            <span style={styles.messageRoleAgent}>Agent</span>
          </div>
          <p style={styles.messageTyping}>Escribiendo…</p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
