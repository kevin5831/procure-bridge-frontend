
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { MaintenanceFormData } from "./types";

interface CostFieldProps {
  form: UseFormReturn<MaintenanceFormData>;
}

export function CostField({ form }: CostFieldProps) {
  return (
    <FormField
      control={form.control}
      name="cost"
      rules={{ 
        required: "Cost is required",
        min: { value: 0, message: "Cost cannot be negative" }
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cost</FormLabel>
          <FormControl>
            <Input 
              type="number"
              min="0"
              step="0.01"
              {...field}
              onChange={e => field.onChange(parseFloat(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
