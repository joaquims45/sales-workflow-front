// Mirrors the DRF contracts in sales-workflow-api (apps/conversations,
// apps/catalog, apps/analytics). Keep this in sync by hand for now — there
// is no schema generation step yet.

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  customer: number | null;
  is_active: boolean;
  created_at: string;
  messages: Message[];
}

export interface WorkflowFrame {
  workflow: string;
  node: string;
}

// Mirrors workflows/graph/state.py::SalesState
export interface SalesState {
  conversation_id: number;

  primary_goal: string | null;
  intent: string | null;

  customer_needs: string[];
  constraints: Record<string, unknown>;

  candidate_products: number[];
  selected_product_id: number | null;

  funnel_stage: string;

  active_workflow: string | null;
  active_node: string | null;

  suspended_workflow: string | null;
  suspended_node: string | null;
  workflow_stack: WorkflowFrame[];

  interruption: string | null;

  routing_decision: string | null;
  routing_confidence: number | null;

  checkout_ready: boolean;
}

export interface WorkflowEvent {
  id: number;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  features: Record<string, unknown>;
  use_cases: string[];
  semantic_tags: string[];
  price: string;
  stock: number;
  is_active: boolean;
}
