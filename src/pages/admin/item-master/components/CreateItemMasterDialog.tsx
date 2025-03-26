
import { useState } from "react";
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
import { CreateItemMasterForm } from "../types";
import { assetCategories } from "@/pages/requests/types";

interface CreateItemMasterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateItemMasterDialog({
  open,
  onOpenChange,
  onSuccess
}: CreateItemMasterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CreateItemMasterForm>({
    defaultValues: {
      item_name: "",
      category: "",
      item_tag_code: "",
      description: "",
      min_quantity: 0,
      max_quantity: 0,
      preferred_vendor: "",
      standard_unit_cost: 0,
      is_active: true,
      attachments: []
    }
  });
  
  async function onSubmit(data: CreateItemMasterForm) {
    setIsSubmitting(true);
    try {
      // Mock API call to create item
      console.log("Creating item master:", data);
      
      // Handle file uploads if any
      if (data.attachments && data.attachments.length > 0) {
        console.log(`Uploading ${data.attachments.length} attachments`);
        // This would be replaced with actual file upload logic
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Item created successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error creating item:", error);
      toast.error("Failed to create item");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Create a standardized item that can be used in procurement requests.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ItemMasterForm 
              form={form} 
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
                {isSubmitting ? "Saving..." : "Save Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
