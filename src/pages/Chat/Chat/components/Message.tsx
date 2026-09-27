import type { Message as MessageType } from "@/types/sales";

import { styles } from "../styles";

const ROLE_LABEL: Record<MessageType["role"], string> = {
  user: "You",
  assistant: "Agent",
  system: "System",
};

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function Message({ role, content, created_at }: Pick<MessageType, "role" | "content" | "created_at">) {
  return (
    <div style={{ ...styles.message, ...(role === "user" ? styles.messageUser : styles.messageAgent) }}>
      <div style={styles.messageMeta}>
        <span style={role === "user" ? styles.messageRoleUser : styles.messageRoleAgent}>{ROLE_LABEL[role]}</span>
        <span style={styles.messageTime}>{formatTime(created_at)}</span>
      </div>
      <p style={styles.messageContent}>{content}</p>
    </div>
  );
}
