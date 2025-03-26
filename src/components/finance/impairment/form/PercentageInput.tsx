
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
import type { ImpairmentFormData, AssetCategory } from "../types";

interface PercentageInputProps {
  form: UseFormReturn<ImpairmentFormData>;
  categories: AssetCategory[];
}

export function PercentageInput({ form, categories }: PercentageInputProps) {
  const selectedCategoryId = form.watch("categoryId");
  const revaluationPercentage = form.watch("revaluationPercentage");
  const revaluationType = form.watch("revaluationType");
  
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  
  const calculateNewValue = () => {
    if (!selectedCategory || !revaluationPercentage) return null;
    
    const percentageFactor = revaluationPercentage / 100;
    const changeAmount = selectedCategory.totalValue * percentageFactor;
    
    const newValue = revaluationType === "upward" 
      ? selectedCategory.totalValue + changeAmount 
      : selectedCategory.totalValue - changeAmount;
    
    return {
      originalValue: selectedCategory.totalValue,
      newValue: newValue,
      changeAmount: changeAmount,
      percentageChange: percentageFactor * 100,
      isIncrease: revaluationType === "upward"
    };
  };

  const valueChange = calculateNewValue();

  return (
    <FormField
      control={form.control}
      name="revaluationPercentage"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Revaluation Percentage</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Enter percentage"
                {...field}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  field.onChange(newValue);
                }}
                className={cn(
                  "px-3 py-5 h-auto pl-8",
                  revaluationType === "upward" ? "border-green-500" : "border-red-500"
                )}
                disabled={!selectedCategoryId}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">%</span>
            </div>
          </FormControl>
          {selectedCategory && valueChange && (
            <div className="mt-2 p-3 rounded-md border bg-muted">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Original Category Value:</span>{" "}
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                  }).format(valueChange.originalValue)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">New Value After Revaluation:</span>{" "}
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                  }).format(valueChange.newValue)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Change:</span>
                  <div className={cn(
                    "flex items-center",
                    valueChange.isIncrease ? "text-green-600" : "text-red-600"
                  )}>
                    {valueChange.isIncrease ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {new Intl.NumberFormat('en-US', { 
                      style: 'currency', 
                      currency: 'USD' 
                    }).format(valueChange.changeAmount)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Affects {selectedCategory.assetCount} assets in this category
                </div>
              </div>
            </div>
          )}
          <FormDescription>
            Enter the percentage by which you want to revalue this asset category. 
            This will affect all assets in the selected category.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
