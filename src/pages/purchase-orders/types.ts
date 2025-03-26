
import type { Database } from '@/integrations/supabase/types';

export interface PurchaseOrder {
  id: string;
  po_number: string;
  po_date: string;
  supplier_name: string;
  supplier_tin?: string;
  supplier_address?: string;
  payment_terms?: string;
  advance_payment?: number;
  delivery_terms?: string;
  delivery_date?: string;
  delivery_address?: string;
  status: string;
  total_amount: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by_name?: string;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  po_id: string;
  item_number: number;
  name: string;
  description: string;
  unit_of_measure?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  remarks?: string;
  item_master_id?: string;
}

export interface CreatePOForm {
  po_date: Date;
  supplier_name: string;
  supplier_tin?: string;
  supplier_address?: string;
  payment_terms?: string;
  advance_payment?: number;
  delivery_terms?: string;
  delivery_date?: Date;
  delivery_address?: string;
  notes?: string;
  items: Array<{
    name: string;
    description: string;
    unit_of_measure?: string;
    quantity: number;
    unit_price: number;
    remarks?: string;
    item_master_id?: string;
  }>;
}

export interface PODetailForm {
  id: string;
  status: string;
}
