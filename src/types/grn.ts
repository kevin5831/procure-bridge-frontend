
export type GRNStatus = 'DRAFT' | 'SUBMITTED' | 'CHECKED' | 'AUTHORIZED' | 'REJECTED';

export interface GRNItem {
  id: string;
  grn_id: string;
  item_name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  asset_category: string;
  condition_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApprovalHistory {
  id: string;
  grn_id: string;
  action: string;
  from_status: GRNStatus | null;
  to_status: GRNStatus | null;
  performed_by: string;
  comments?: string;
  created_at: string;
}

export interface GRN {
  id: string;
  purchase_order_id?: string;
  received_date: string;
  supplier_name: string;
  status: GRNStatus;
  workflow_step: number;
  created_by?: string;
  checked_by?: string;
  authorized_by?: string;
  submitted_by?: string;
  submitted_at?: string;
  checked_at?: string;
  authorized_at?: string;
  notes?: string;
  total_items: number;
  total_value: number;
  created_at?: string;
  updated_at?: string;
  items?: GRNItem[];
  approval_history?: ApprovalHistory[];
}
