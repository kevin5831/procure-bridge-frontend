
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { LineItemHeader } from "./LineItemHeader";
import { LineItemCatalogSelector } from "./LineItemCatalogSelector";
import { LineItemDetails } from "./LineItemDetails";
import { LineItemCostFields } from "./LineItemCostFields";

// Hidden fields for form data
import { FormField } from "@/components/ui/form";

interface LineItemFormProps {
  form: UseFormReturn<any>;
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
}

export function LineItemForm({ form, index, onRemove, isRemovable }: LineItemFormProps) {
  const [selectedItemId, setSelectedItemId] = useState(
    form.getValues(`lineItems.${index}.itemMasterId`) || ""
  );

  // Query to fetch item masters for details view
  const { data: itemMasters = [] } = useQuery({
    queryKey: ["itemMasters"],
    queryFn: async () => {
      // This would be replaced with an actual API call
      return [
        {
          id: "1",
          item_name: "Dell XPS 15 Laptop",
          category: "IT Equipment",
          item_tag_code: "IT-001",
          description: "High-performance laptop for developers",
          min_quantity: 1,
          max_quantity: 10,
          preferred_vendor: "Dell Technologies",
          standard_unit_cost: 1200,
          is_active: true
        },
        {
          id: "2",
          item_name: "Office Desk Chair",
          category: "Furniture",
          item_tag_code: "FUR-001",
          description: "Ergonomic office chair",
          min_quantity: 1,
          max_quantity: 50,
          preferred_vendor: "Office Depot",
          standard_unit_cost: 250,
          is_active: true
        },
        {
          id: "3",
          item_name: "MacBook Pro M2",
          category: "IT Equipment",
          item_tag_code: "IT-002",
          description: "Apple MacBook Pro with M2 chip",
          min_quantity: 1,
          max_quantity: 5,
          preferred_vendor: "Apple Inc.",
          standard_unit_cost: 1800,
          is_active: false
        }
      ];
    }
  });

  // Safe handler for item selection that prevents default form submission
  const handleItemMasterSelect = (itemMasterId: string) => {
    // Update the selected item ID state
    setSelectedItemId(itemMasterId);
    
    // If user deselects or selects "Custom Item", clear the form fields
    if (!itemMasterId) {
      form.setValue(`lineItems.${index}.itemMasterId`, "");
      return;
    }

    // Find the selected item
    const selectedItem = itemMasters.find(item => item.id === itemMasterId);
    
    // If an item is found, update the form fields with its data
    if (selectedItem) {
      form.setValue(`lineItems.${index}.title`, selectedItem.item_name);
      form.setValue(`lineItems.${index}.assetCategory`, selectedItem.category);
      form.setValue(`lineItems.${index}.unitCost`, selectedItem.standard_unit_cost);
      form.setValue(`lineItems.${index}.itemMasterId`, selectedItem.id);
      form.setValue(`lineItems.${index}.quantity`, 1); // Default quantity to 1
    }
  };

  // Get the selected item for displaying readonly fields
  const selectedItem = itemMasters.find(item => item.id === selectedItemId);

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm relative">
      <LineItemHeader onRemove={onRemove} isRemovable={isRemovable} />

      <CardContent className="space-y-6 pt-6">
        <div>
          <LineItemCatalogSelector 
            form={form} 
            index={index} 
            onItemSelect={handleItemMasterSelect}
            selectedItemId={selectedItemId}
          />
        </div>

        <LineItemDetails selectedItem={selectedItem || null} />
        
        <LineItemCostFields form={form} index={index} />

        {/* Hidden fields for form data */}
        <FormField
          control={form.control}
          name={`lineItems.${index}.title`}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />

        <FormField
          control={form.control}
          name={`lineItems.${index}.assetCategory`}
          rules={{ required: "Asset category is required" }}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
      </CardContent>
    </Card>
  );
}

export { createDefaultLineItem } from './utils';
