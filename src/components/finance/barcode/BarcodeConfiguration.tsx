
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BarcodeSettings } from "./BarcodeSettings";
import { PrinterSettings } from "./PrinterSettings";
import { ScannerSettings } from "./ScannerSettings";
import { barcodeFormSchema, type BarcodeFormValues, defaultValues } from "./schema";

export function BarcodeConfiguration() {
  const form = useForm<BarcodeFormValues>({
    resolver: zodResolver(barcodeFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: BarcodeFormValues) => {
    try {
      console.log("Saving barcode configuration:", data);
      toast.success("Barcode configuration saved successfully");
    } catch (error) {
      toast.error("Failed to save barcode configuration");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <BarcodeSettings form={form} />
            <PrinterSettings form={form} />
            <ScannerSettings form={form} />
          </div>
          <Button type="submit">Save Configuration</Button>
        </form>
      </Form>
    </div>
  );
}
