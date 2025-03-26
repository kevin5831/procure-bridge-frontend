
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { ImpairmentFormData } from "../types";

interface ReasonInputProps {
  form: UseFormReturn<ImpairmentFormData>;
}

export function ReasonInput({ form }: ReasonInputProps) {
  return (
    <FormField
      control={form.control}
      name="reason"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Reason for Revaluation</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe the reason for this revaluation (e.g., market changes, technological obsolescence, etc.)"
              className="resize-none min-h-[120px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
