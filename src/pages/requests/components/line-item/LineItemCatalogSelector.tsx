
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { CreateItemDialog } from "../CreateItemDialog";
import { useQuery } from "@tanstack/react-query";

interface LineItemCatalogSelectorProps {
  form: UseFormReturn<any>;
  index: number;
  onItemSelect: (itemMasterId: string) => void;
  selectedItemId: string;
}

export function LineItemCatalogSelector({ 
  form, 
  index, 
  onItemSelect, 
  selectedItemId 
}: LineItemCatalogSelectorProps) {
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);

  // Query to fetch item masters
  const { data: itemMasters = [], refetch } = useQuery({
    queryKey: ["itemMasters"],
    queryFn: async () => {
      console.log("Fetching item masters for line item form");
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

  // Convert item masters to options for the combobox
  const itemOptions = itemMasters
    .filter(item => item.is_active)
    .map(item => ({
      value: item.id,
      label: `${item.item_name} (${item.category} - $${item.standard_unit_cost})`
    }));

  const handleCreateNewItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsNewItemDialogOpen(true);
  };

  const handleNewItemCreated = async (newItem: any) => {
    await refetch(); // Refetch item masters to include the new item
    
    // Find the newly created item and select it
    const createdItem = itemMasters.find(item => item.id === newItem.id);
    if (createdItem) {
      onItemSelect(createdItem.id);
      form.setValue(`lineItems.${index}.itemMasterId`, createdItem.id);
    }
    
    setIsNewItemDialogOpen(false);
  };

  // New onChange handler to update form value and call onItemSelect
  const handleSelect = (selectedItemId: string) => {
    form.setValue(`lineItems.${index}.itemMasterId`, selectedItemId);
    onItemSelect(selectedItemId);
  };

  return (
    <>
      <FormField
        control={form.control}
        name={`lineItems.${index}.itemMasterId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Select Item from Catalog</FormLabel>
            <FormControl>
              <Combobox
                options={itemOptions}
                value={field.value || ""}
                onChange={handleSelect}
                placeholder="Search and select an item from Item Master..."
                searchPlaceholder="Type to search items..."
                className="mt-2 w-full"
              />
            </FormControl>
            <div className="text-sm mt-2">
              <button 
                type="button" 
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={handleCreateNewItem}
              >
                Can't find your item? Create a new one →
              </button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <CreateItemDialog 
        open={isNewItemDialogOpen} 
        onOpenChange={setIsNewItemDialogOpen}
        onItemCreated={handleNewItemCreated}
      />
    </>
  );
}
