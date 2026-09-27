import type { MessageRole } from "@/types/sales";

import { styles } from "../styles";

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  return <div style={role === "user" ? styles.bubbleUser : styles.bubbleAssistant}>{content}</div>;
}
