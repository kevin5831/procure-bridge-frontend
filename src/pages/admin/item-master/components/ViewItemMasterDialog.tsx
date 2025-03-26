
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ItemMaster } from "../types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Paperclip } from "lucide-react";

interface ViewItemMasterDialogProps {
  item: ItemMaster;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewItemMasterDialog({
  item,
  open,
  onOpenChange,
}: ViewItemMasterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>
            View detailed information about this item.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{item.item_name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{item.item_tag_code}</span>
                <Badge variant={item.is_active ? "outline" : "destructive"}>
                  {item.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Category</h4>
              <p className="text-base">{item.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Standard Unit Cost</h4>
              <p className="text-base font-medium">{formatCurrency(item.standard_unit_cost)}</p>
            </div>
          </div>

          {item.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="text-base">{item.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Min Quantity</h4>
              <p className="text-base">{item.min_quantity}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Max Quantity</h4>
              <p className="text-base">{item.max_quantity}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Preferred Vendor</h4>
            <p className="text-base">{item.preferred_vendor || "-"}</p>
          </div>

          {item.attachments && item.attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Attachments</h4>
              <div className="mt-2 space-y-1">
                {item.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {`Attachment ${index + 1}`}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
