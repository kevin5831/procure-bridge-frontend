
export interface ItemMaster {
  id: string;
  item_name: string;
  category: string;
  item_tag_code: string;
  description?: string;
  min_quantity: number;
  max_quantity: number;
  preferred_vendor?: string;
  standard_unit_cost: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  attachments?: string[]; // URLs to attachment files
}

export interface CreateItemMasterForm {
  item_name: string;
  category: string;
  item_tag_code: string;
  description?: string;
  min_quantity: number;
  max_quantity: number;
  preferred_vendor?: string;
  standard_unit_cost: number;
  is_active: boolean;
  attachments?: File[];
}

export interface UpdateItemMasterForm extends CreateItemMasterForm {
  id: string;
}

