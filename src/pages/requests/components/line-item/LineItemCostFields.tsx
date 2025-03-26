
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";

interface LineItemCostFieldsProps {
  form: UseFormReturn<any>;
  index: number;
}

export function LineItemCostFields({ form, index }: LineItemCostFieldsProps) {
  const quantity = form.watch(`lineItems.${index}.quantity`) || 0;
  const unitCost = form.watch(`lineItems.${index}.unitCost`) || 0;
  const totalCost = quantity * unitCost;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField
            control={form.control}
            name={`lineItems.${index}.unitCost`}
            rules={{ 
              required: "Unit cost is required",
              min: { value: 0, message: "Unit cost cannot be negative" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Unit Cost</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    placeholder="0"
                    className="mt-1"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name={`lineItems.${index}.quantity`}
            rules={{ 
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    placeholder="1"
                    className="mt-1"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mt-2">
        <div className="flex justify-between items-center">
          <div className="text-base font-medium">Total Cost:</div>
          <div className="text-base font-bold">
            ${totalCost.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
}
