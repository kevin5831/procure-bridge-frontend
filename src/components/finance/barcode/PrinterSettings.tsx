
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { BarcodeFormValues } from "./schema";

interface PrinterSettingsProps {
  form: UseFormReturn<BarcodeFormValues>;
}

export function PrinterSettings({ form }: PrinterSettingsProps) {
  const handleTestPrinter = () => {
    const prefix = form.getValues("prefix");
    const digitLength = form.getValues("digitLength");
    const useCheckDigit = form.getValues("useCheckDigit");

    // Generate example barcode
    const sequence = "1".padStart(digitLength, "0");
    const exampleBarcode = `${prefix}${sequence}${useCheckDigit ? "C" : ""}`;
    
    toast.success(`Test page sent to printer with example barcode: ${exampleBarcode}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5" />
          Printer Configuration
        </CardTitle>
        <CardDescription>
          Configure label printer settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="printerModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Printer Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select printer model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="zebra">Zebra</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="dymo">DYMO</SelectItem>
                  <SelectItem value="tsc">TSC</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="printerIpAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Printer IP Address</FormLabel>
              <FormControl>
                <Input placeholder="192.168.1.100" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleTestPrinter}
          className="w-full"
        >
          Test Printer
        </Button>
      </CardContent>
    </Card>
  );
}
