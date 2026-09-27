import { useRef, useState } from "react";

import type { MessageRole } from "@/types/sales";

import { Composer } from "./components/Composer";
import { MessageBubble } from "./components/MessageBubble";
import { styles } from "./styles";

interface LocalMessage {
  id: number;
  role: MessageRole;
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const nextId = useRef(1);

  // UI-only for now — wiring this up to POST /api/conversations/{id}/messages/
  // is the next step (feat: connect chat to conversation api).
  function handleSend(content: string) {
    setMessages((previous) => [...previous, { id: nextId.current++, role: "user", content }]);
  }

  return (
    <div style={styles.container}>
      <h1>Chat</h1>

      <div style={styles.messageList}>
        {messages.length === 0 && <p>Contale al asistente qué estás buscando.</p>}
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}
      </div>

      <Composer onSend={handleSend} />
    </div>
  );
}
