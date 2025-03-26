
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { BarcodeFormValues } from "./schema";

interface ScannerSettingsProps {
  form: UseFormReturn<BarcodeFormValues>;
}

export function ScannerSettings({ form }: ScannerSettingsProps) {
  const handleTestScanner = () => {
    toast.success("Scanner test initiated. Please scan a barcode to verify format.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScanLine className="h-5 w-5" />
          Scanner Configuration
        </CardTitle>
        <CardDescription>
          Configure barcode scanner settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="scannerModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scanner Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scanner model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="honeywell">Honeywell</SelectItem>
                  <SelectItem value="zebra">Zebra</SelectItem>
                  <SelectItem value="datalogic">Datalogic</SelectItem>
                  <SelectItem value="symbol">Symbol</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleTestScanner}
          className="w-full"
        >
          Test Scanner
        </Button>
      </CardContent>
    </Card>
  );
}
