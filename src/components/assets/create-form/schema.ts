
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Please select a location"),
  status: z.string().min(1, "Please select a status"),
  purchasePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid purchase price",
  }),
  purchaseDate: z.string().min(1, "Please select a purchase date"),
  serialNumber: z.string().optional(),
  warrantyExpiration: z.string().optional(),
  // IT Asset specific fields
  itCategory: z.string().optional(),
  brandModel: z.string().optional(),
  processor: z.string().optional(),
  memory: z.string().optional(),
  storage: z.string().optional(),
  color: z.string().optional(),
  otherSpecs: z.string().optional(),
  condition: z.string().optional(),
  conditionNotes: z.string().optional(),
  assignToEmployee: z.boolean().optional(),
  assignedTo: z.string().optional(),
  shippingAddress: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
