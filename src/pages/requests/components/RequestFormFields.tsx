import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { costCenters, CreateRequestForm } from "../types";
import { Button } from "@/components/ui/button";
import { LineItemForm, createDefaultLineItem } from "./line-item";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";

interface RequestFormFieldsProps {
  form: UseFormReturn<CreateRequestForm>;
}

export function RequestFormFields({ form }: RequestFormFieldsProps) {
  const lineItems = form.watch("lineItems") || [];
  
  const calculateTotalCost = () => {
    return lineItems.reduce((total, item) => {
      return total + (item.quantity || 0) * (item.unitCost || 0);
    }, 0);
  };

  const addLineItem = () => {
    const currentItems = form.getValues("lineItems") || [];
    form.setValue("lineItems", [...currentItems, createDefaultLineItem()]);
  };

  const removeLineItem = (index: number) => {
    const items = form.getValues("lineItems");
    form.setValue(
      "lineItems",
      items.filter((_, i) => i !== index)
    );
  };

  // Convert cost centers to the format expected by Combobox
  const costCenterOptions = costCenters.map(center => ({
    value: center,
    label: center
  }));

  // Create a safe handler for cost center selection
  const handleCostCenterChange = (value: string) => {
    form.setValue("costCenter", value);
  };

  return (
    <div className="space-y-8">
      {/* Request Header Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Request Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Title</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the request..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="costCenter"
            rules={{ required: "Cost center is required" }}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Budget/Cost Center</FormLabel>
                <FormControl>
                  <Combobox
                    options={costCenterOptions}
                    value={field.value}
                    onChange={handleCostCenterChange}
                    placeholder="Select cost center"
                    searchPlaceholder="Search cost centers..."
                    className="bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Requested Items Section */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-medium">Requested Items</CardTitle>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addLineItem}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {lineItems.length === 0 && (
            <div className="bg-muted/50 p-6 rounded-md text-center">
              <p className="text-muted-foreground">No items added yet. Click "Add Item" to add your first item.</p>
            </div>
          )}

          {lineItems.map((_, index) => (
            <LineItemForm 
              key={form.getValues(`lineItems.${index}.id`) || index}
              form={form} 
              index={index} 
              onRemove={() => removeLineItem(index)}
              isRemovable={lineItems.length > 1}
            />
          ))}

          <div className="bg-muted/20 p-4 rounded-md mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Total Estimated Request Cost:</div>
              <div className="text-lg font-bold">${calculateTotalCost().toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Justification Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="justification"
            rules={{ required: "Justification is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Please provide a detailed justification for this request..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
