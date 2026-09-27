import { ConversationSwitcher } from "./components/ConversationSwitcher";
import { MessageComposer } from "./components/MessageComposer";
import { MessageList } from "./components/MessageList";
import { useConversation } from "./hooks/useConversation";
import { styles } from "./styles";

export default function Chat() {
  const {
    conversationId,
    messages,
    isSending,
    error,
    sendMessage,
    startNewConversation,
    switchConversation,
  } = useConversation();

  return (
    <div style={styles.container}>
      <ConversationSwitcher
        conversationId={conversationId}
        onStartNew={startNewConversation}
        onSwitch={switchConversation}
      />

      <MessageList messages={messages} isSending={isSending} />

      {error && <p role="alert">{error}</p>}

      <MessageComposer onSend={sendMessage} disabled={conversationId === null || isSending} />
    </div>
  );
}
