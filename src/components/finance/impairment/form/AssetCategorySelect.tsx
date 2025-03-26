
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
import type { ImpairmentFormData, AssetCategory } from "../types";

interface AssetCategorySelectProps {
  form: UseFormReturn<ImpairmentFormData>;
  categories: AssetCategory[];
}

export function AssetCategorySelect({ form, categories }: AssetCategorySelectProps) {
  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Asset Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="px-3 py-5 h-auto">
                <SelectValue placeholder="Select asset category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex flex-col">
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.assetCount} assets ({new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD' 
                      }).format(category.totalValue)})
                    </span>
                  </div>
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
