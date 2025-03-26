
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ImpairmentFormData } from "../types";

interface RevaluationTypeSelectProps {
  form: UseFormReturn<ImpairmentFormData>;
}

const revaluationTypes = [
  { value: "upward", label: "Upward Revaluation" },
  { value: "downward", label: "Downward Revaluation (Impairment)" }
];

export function RevaluationTypeSelect({ form }: RevaluationTypeSelectProps) {
  const selectedCategory = form.watch("categoryId");
  const revaluationPercentage = form.watch("revaluationPercentage");

  return (
    <FormField
      control={form.control}
      name="revaluationType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Revaluation Type</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={!selectedCategory || revaluationPercentage === 0}
          >
            <FormControl>
              <SelectTrigger className={cn(
                "px-3 py-5 h-auto",
                field.value === "upward" ? "text-green-600" : "text-red-600"
              )}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {revaluationTypes.map(type => (
                <SelectItem 
                  key={type.value} 
                  value={type.value}
                  className={cn(
                    type.value === "upward" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
