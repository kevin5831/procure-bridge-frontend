
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import type { MaintenanceFormData } from "./types";
import { Combobox } from "@/components/ui/combobox";

interface AssetFieldProps {
  form: UseFormReturn<MaintenanceFormData>;
}

// In a real application, this would come from an API with pagination/search
const mockAssets = [
  { value: "AST001", label: "AST001 - HP Laptop EliteBook G8" },
  { value: "AST002", label: "AST002 - Executive Desk" },
  { value: "AST003", label: "AST003 - Company Vehicle" },
];

export function AssetField({ form }: AssetFieldProps) {
  // Create a safe handler for asset selection
  const handleAssetChange = (value: string) => {
    form.setValue("assetId", value, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name="assetId"
      rules={{ required: "Asset ID is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Asset ID</FormLabel>
          <FormControl>
            <Combobox
              options={mockAssets}
              value={field.value}
              onChange={handleAssetChange}
              placeholder="Select an asset"
              searchPlaceholder="Search assets..."
              className="bg-background"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
