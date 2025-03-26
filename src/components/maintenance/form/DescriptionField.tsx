
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import type { MaintenanceFormData } from "./types";

interface DescriptionFieldProps {
  form: UseFormReturn<MaintenanceFormData>;
}

export function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      rules={{ required: "Description is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description of Work</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe the maintenance work..."
              className="min-h-[100px]" 
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
