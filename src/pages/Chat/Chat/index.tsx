import { Composer } from "./components/Composer";
import { MessageBubble } from "./components/MessageBubble";
import { useConversation } from "./hooks/useConversation";
import { styles } from "./styles";

export default function Chat() {
  const { conversationId, messages, isSending, error, sendMessage } = useConversation();

  return (
    <div style={styles.container}>
      <h1>Chat</h1>

      <div style={styles.messageList}>
        {messages.length === 0 && !error && <p>Contale al asistente qué estás buscando.</p>}
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}
        {isSending && <MessageBubble role="assistant" content="Escribiendo…" />}
      </div>

      {error && <p role="alert">{error}</p>}

      <Composer onSend={sendMessage} disabled={conversationId === null || isSending} />
    </div>
  );
}
