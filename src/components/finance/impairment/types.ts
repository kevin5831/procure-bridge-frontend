
import { z } from "zod";

export const impairmentFormSchema = z.object({
  categoryId: z.string().min(1, "Please select an asset category"),
  revaluationType: z.enum(["upward", "downward"]),
  revaluationPercentage: z.number().min(0, "Percentage must be greater than 0"),
  effectiveDate: z.date(),
  reason: z.string().min(1, "Please provide a reason for revaluation"),
  attachments: z.array(z.instanceof(File)).optional(),
});

export type ImpairmentFormData = z.infer<typeof impairmentFormSchema>;

export interface MockAsset {
  id: string;
  name: string;
  currentValue: number;
  category: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  totalValue: number;
  assetCount: number;
}
