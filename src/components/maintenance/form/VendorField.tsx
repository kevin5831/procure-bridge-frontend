
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useWatch } from "react-hook-form";
import type { MaintenanceFormData } from "./types";

interface VendorFieldProps {
  form: UseFormReturn<MaintenanceFormData>;
}

// This would come from your vendor management system
const mockVendors = [
  "Cool Tech Services",
  "PrintFix Solutions",
  "General Maintenance Inc"
];

export function VendorField({ form }: VendorFieldProps) {
  const maintenanceType = useWatch({
    control: form.control,
    name: "maintenanceType"
  });

  if (maintenanceType !== "External") {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name="vendor"
      rules={{ required: "Vendor is required for external maintenance" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vendor/Service Provider</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Vendor" />
              </SelectTrigger>
              <SelectContent>
                {mockVendors.map((vendor) => (
                  <SelectItem key={vendor} value={vendor}>
                    {vendor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
