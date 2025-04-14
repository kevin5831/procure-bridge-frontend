
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImpairmentFormData, MockAsset } from "../types";

interface FairValueInputProps {
  form: UseFormReturn<ImpairmentFormData>;
  assets: MockAsset[];
}

export function FairValueInput({ form, assets }: FairValueInputProps) {
  const selectedAsset = assets.find(asset => asset.id === form.watch("assetId"));
  const fairValue = form.watch("fairValue");
  
  const calculateDifference = () => {
    if (!selectedAsset || !fairValue) return null;
    
    const difference = fairValue - selectedAsset.currentValue;
    const percentageChange = (difference / selectedAsset.currentValue) * 100;
    
    // Automatically set revaluation type based on fair value
    if (difference > 0 && form.getValues("revaluationType") !== "upward") {
      form.setValue("revaluationType", "upward");
    } else if (difference < 0 && form.getValues("revaluationType") !== "downward") {
      form.setValue("revaluationType", "downward");
    }
    
    return {
      difference,
      percentageChange,
      isIncrease: difference > 0
    };
  };

  const difference = calculateDifference();

  return (
    <FormField
      control={form.control}
      name="fairValue"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">New Fair Value</FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter new fair value"
              {...field}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                field.onChange(newValue);
              }}
              className={cn(
                "px-3 py-5 h-auto",
                difference?.isIncrease ? "border-green-500" : difference ? "border-red-500" : ""
              )}
            />
          </FormControl>
          {selectedAsset && difference && (
            <div className="mt-2 p-3 rounded-md border bg-muted">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Change:</span>
                  <div className={cn(
                    "flex items-center",
                    difference.isIncrease ? "text-green-600" : "text-red-600"
                  )}>
                    {difference.isIncrease ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    ${Math.abs(difference.difference).toFixed(2)} 
                    ({difference.percentageChange.toFixed(2)}%)
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Current book value: ${selectedAsset.currentValue.toFixed(2)}
                </div>
              </div>
            </div>
          )}
          <FormDescription>
            Enter the new fair value of the asset. This will automatically determine if it's an upward or downward revaluation.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
