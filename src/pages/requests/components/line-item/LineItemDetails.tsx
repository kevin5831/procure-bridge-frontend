
import { FormLabel } from "@/components/ui/form";

interface ItemDetailsProps {
  selectedItem: {
    category: string;
    item_tag_code: string;
    preferred_vendor?: string;
  } | null;
}

export function LineItemDetails({ selectedItem }: ItemDetailsProps) {
  if (!selectedItem) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-3 rounded-md">
      <div>
        <FormLabel className="text-sm font-medium">Asset Category</FormLabel>
        <div className="text-sm mt-1">{selectedItem.category}</div>
      </div>
      <div>
        <FormLabel className="text-sm font-medium">Tag Code</FormLabel>
        <div className="text-sm mt-1">{selectedItem.item_tag_code}</div>
      </div>
      <div>
        <FormLabel className="text-sm font-medium">Preferred Vendor</FormLabel>
        <div className="text-sm mt-1">{selectedItem.preferred_vendor || "Not specified"}</div>
      </div>
    </div>
  );
}
