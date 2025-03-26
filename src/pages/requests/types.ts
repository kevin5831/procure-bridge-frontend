
import type { Database } from '@/integrations/supabase/types';

export type AssetCategory = Database['public']['Enums']['asset_category'];

export interface RequestLineItem {
  id: string;
  title: string;
  assetCategory: AssetCategory;
  quantity: number;
  unitCost: number;
  // Item Master reference
  itemMasterId?: string;
  // Optional IT Asset specific fields
  itCategory?: string;
  brandModel?: string;
  processor?: string;
  memory?: string;
  storage?: string;
  color?: string;
  otherSpecs?: string;
  condition?: string;
  conditionNotes?: string;
}

export interface CreateRequestForm {
  title: string;
  costCenter: string;
  justification: string;
  lineItems: RequestLineItem[];
}

export const assetCategories = [
  "IT Equipment",
  "Furniture",
  "Vehicle",
  "Office Equipment",
  "Machinery",
  "Building",
  "Land",
] as const;

export const costCenters = [
  "IT Department",
  "Finance Department",
  "Operations",
  "Human Resources",
  "Marketing",
  "Sales",
  "Research & Development",
];
