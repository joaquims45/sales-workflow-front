import { SplitPane } from "@/components/SplitPane";

import { ConversationPanel } from "./components/ConversationPanel";
import { WorkflowPanel } from "./components/WorkflowPanel";
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
      <SplitPane
        left={
          <ConversationPanel
            conversationId={conversationId}
            messages={messages}
            isSending={isSending}
            error={error}
            sendMessage={sendMessage}
            startNewConversation={startNewConversation}
            switchConversation={switchConversation}
          />
        }
        right={<WorkflowPanel conversationId={conversationId} />}
      />
    </div>
  );
}
