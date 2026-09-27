import { apiPost } from "@/hooks/api";
import type { Conversation, PostMessageResponse } from "@/types/sales";

export function createConversation(): Promise<Conversation> {
  return apiPost<Conversation>("/api/conversations/");
}

export function postMessage(conversationId: number, content: string): Promise<PostMessageResponse> {
  return apiPost<PostMessageResponse>(`/api/conversations/${conversationId}/messages/`, { content });
}
