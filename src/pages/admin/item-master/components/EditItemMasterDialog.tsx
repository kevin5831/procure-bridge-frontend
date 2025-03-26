
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ItemMasterForm } from "./ItemMasterForm";
import { ItemMaster, UpdateItemMasterForm } from "../types";
import { assetCategories } from "@/pages/requests/types";

interface EditItemMasterDialogProps {
  item: ItemMaster;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditItemMasterDialog({
  item,
  open,
  onOpenChange,
  onSuccess
}: EditItemMasterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<UpdateItemMasterForm>({
    defaultValues: {
      id: item.id,
      item_name: item.item_name,
      category: item.category,
      item_tag_code: item.item_tag_code,
      description: item.description || "",
      min_quantity: item.min_quantity,
      max_quantity: item.max_quantity,
      preferred_vendor: item.preferred_vendor || "",
      standard_unit_cost: item.standard_unit_cost,
      is_active: item.is_active,
      attachments: []
    }
  });
  
  // Update form values when item changes
  useEffect(() => {
    form.reset({
      id: item.id,
      item_name: item.item_name,
      category: item.category,
      item_tag_code: item.item_tag_code,
      description: item.description || "",
      min_quantity: item.min_quantity,
      max_quantity: item.max_quantity,
      preferred_vendor: item.preferred_vendor || "",
      standard_unit_cost: item.standard_unit_cost,
      is_active: item.is_active,
      attachments: []
    });
  }, [item, form]);
  
  async function onSubmit(data: UpdateItemMasterForm) {
    setIsSubmitting(true);
    try {
      // Mock API call to update item
      console.log("Updating item master:", data);
      
      // Handle file uploads if any
      if (data.attachments && data.attachments.length > 0) {
        console.log(`Uploading ${data.attachments.length} attachments`);
        // This would be replaced with actual file upload logic
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Item updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to the item details.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ItemMasterForm 
              form={form as any} 
              categories={Array.from(assetCategories)}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
