import type { Message } from "@/types/sales";

import { styles } from "../styles";
import { ConversationSwitcher } from "./ConversationSwitcher";
import { MessageComposer } from "./MessageComposer";
import { MessageList } from "./MessageList";

interface ConversationPanelProps {
  conversationId: number | null;
  messages: Message[];
  isSending: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
  startNewConversation: () => void;
  switchConversation: (conversationId: number) => void;
}

export function ConversationPanel({
  conversationId,
  messages,
  isSending,
  error,
  sendMessage,
  startNewConversation,
  switchConversation,
}: ConversationPanelProps) {
  return (
    <div style={styles.conversationPanel}>
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
