import type { WorkflowEventMessage } from "@/types/sales";

/**
 * Events since the last message.received — the turn currently in progress
 * (or just finished), not the whole conversation history. Shared by
 * deriveNodeStates and deriveSideQuery so both agree on the same window.
 */
export function turnEvents(events: WorkflowEventMessage[]): WorkflowEventMessage[] {
  const lastMessageIndex = events.map((event) => event.event_type).lastIndexOf("message.received");
  return lastMessageIndex === -1 ? events : events.slice(lastMessageIndex);
}
