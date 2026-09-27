import { apiGet, apiPost } from "@/hooks/api";
import type { Conversation, PostMessageResponse, SalesState, WorkflowEvent } from "@/types/sales";

// Which conversation the app is currently talking to. Chat creates it;
// Observability pages read the same one to show its live state.
const STORAGE_KEY = "sales-workflow:conversation-id";

export function getStoredConversationId(): number | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? Number(stored) : null;
}

export function storeConversationId(conversationId: number): void {
  localStorage.setItem(STORAGE_KEY, String(conversationId));
}

export function createConversation(): Promise<Conversation> {
  return apiPost<Conversation>("/api/conversations/");
}

export function getState(conversationId: number): Promise<SalesState> {
  return apiGet<SalesState>(`/api/conversations/${conversationId}/state/`);
}

export function postMessage(conversationId: number, content: string): Promise<PostMessageResponse> {
  return apiPost<PostMessageResponse>(`/api/conversations/${conversationId}/messages/`, { content });
}

export function getTrace(conversationId: number): Promise<WorkflowEvent[]> {
  return apiGet<WorkflowEvent[]>(`/api/conversations/${conversationId}/trace/`);
}
