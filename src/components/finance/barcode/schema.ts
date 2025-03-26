
import * as z from "zod";

export const barcodeFormSchema = z.object({
  barcodeFormat: z.string().min(1, "Please select a barcode format"),
  printerModel: z.string().min(1, "Printer model is required"),
  printerIpAddress: z.string().min(1, "Printer IP address is required"),
  enableQrCodes: z.boolean(),
  enableRfid: z.boolean(),
  scannerModel: z.string().min(1, "Scanner model is required"),
  prefix: z.string().min(1, "Prefix is required for asset identification").max(5, "Prefix cannot exceed 5 characters"),
  digitLength: z.number().min(4, "Sequence length must be at least 4 digits").max(10, "Sequence length cannot exceed 10 digits"),
  autoGenerate: z.boolean(),
  useCheckDigit: z.boolean(),
});

export type BarcodeFormValues = z.infer<typeof barcodeFormSchema>;

export const defaultValues: Partial<BarcodeFormValues> = {
  barcodeFormat: "code128",
  printerModel: "",
  printerIpAddress: "",
  enableQrCodes: true,
  enableRfid: false,
  scannerModel: "",
  prefix: "AST",
  digitLength: 6,
  autoGenerate: true,
  useCheckDigit: true,
};
