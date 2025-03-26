
import { z } from "zod";

export const maintenanceFormSchema = z.object({
  assetId: z.string().min(1, "Asset is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  scheduledDate: z.date(),
  cost: z.number().min(0),
  maintenanceType: z.enum(["Internal", "External"]),
  vendor: z.string().optional(),
  status: z.enum(["Scheduled", "In Progress", "Completed"]).default("Scheduled"),
  notes: z.array(z.string()).default([]),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    uploadedAt: z.string()
  })).default([])
});

export type MaintenanceFormData = z.infer<typeof maintenanceFormSchema>;
