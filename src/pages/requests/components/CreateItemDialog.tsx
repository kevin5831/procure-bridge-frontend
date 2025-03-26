
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { assetCategories } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemCreated: (newItem: any) => void;
}

export function CreateItemDialog({ open, onOpenChange, onItemCreated }: CreateItemDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    item_tag_code: "",
    description: "",
    preferred_vendor: "",
    standard_unit_cost: 0
  });

  // Query to fetch vendors
  const { data: vendors = [] } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      // This would be replaced with an actual API call
      return [
        { id: "1", vendor_name: "Dell Technologies" },
        { id: "2", vendor_name: "Apple Inc." },
        { id: "3", vendor_name: "Office Depot" },
        { id: "4", vendor_name: "HP Inc." },
        { id: "5", vendor_name: "Microsoft" }
      ];
    },
    // Only fetch when dialog is open
    enabled: open
  });

  // Auto-generate tag code when category changes
  useEffect(() => {
    if (formData.category) {
      // Get the category prefix
      const prefix = getCategoryPrefix(formData.category);
      
      // Get existing items for this category to determine the next number
      const nextNumber = getNextItemNumber(formData.category);
      
      // Format: PREFIX-001, PREFIX-002, etc.
      const tagCode = `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        item_tag_code: tagCode
      }));
    }
  }, [formData.category]);

  // Helper function to get category prefix
  const getCategoryPrefix = (category: string): string => {
    switch (category) {
      case "IT Equipment":
        return "IT";
      case "Furniture":
        return "FUR";
      case "Vehicle":
        return "VEH";
      case "Office Equipment":
        return "OFF";
      case "Machinery":
        return "MACH";
      case "Building":
        return "BLD";
      case "Land":
        return "LAND";
      default:
        return category.substring(0, 3).toUpperCase();
    }
  };

  // Helper function to get the next item number for a category
  const getNextItemNumber = (category: string): number => {
    // In a real implementation, this would query the database
    // For now, we'll use a simple mock implementation
    const categoryPrefixes: Record<string, number> = {
      "IT Equipment": 3, // Next would be IT-003
      "Furniture": 2,    // Next would be FUR-002
      "Vehicle": 1,      // Next would be VEH-001
      "Office Equipment": 1,
      "Machinery": 1,
      "Building": 1,
      "Land": 1
    };
    
    return (categoryPrefixes[category] || 0) + 1;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "standard_unit_cost" ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.item_name || !formData.category || !formData.item_tag_code || formData.standard_unit_cost <= 0) {
        throw new Error("Please fill all required fields");
      }

      // Create new item (mock API call)
      console.log("Creating new item:", formData);
      
      // Mock successful item creation
      const newItem = {
        id: uuidv4(),
        ...formData,
        is_active: true,
        min_quantity: 1,
        max_quantity: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      toast.success("Item created successfully");
      onItemCreated(newItem);
      
      // Reset form
      setFormData({
        item_name: "",
        category: "",
        item_tag_code: "",
        description: "",
        preferred_vendor: "",
        standard_unit_cost: 0
      });
    } catch (error) {
      console.error("Error creating item:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Item to Catalog</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item_name" className="font-medium">Item Name <span className="text-red-500">*</span></Label>
            <Input
              id="item_name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="font-medium">Category <span className="text-red-500">*</span></Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {assetCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item_tag_code" className="font-medium">Tag Code <span className="text-red-500">*</span></Label>
            <Input
              id="item_tag_code"
              name="item_tag_code"
              value={formData.item_tag_code}
              onChange={handleChange}
              placeholder="Auto-generated after selecting category"
              readOnly
              className="bg-gray-50"
            />
            <p className="text-sm text-gray-500">Automatically generated based on category</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferred_vendor" className="font-medium">Preferred Vendor</Label>
            <Select
              value={formData.preferred_vendor}
              onValueChange={(value) => handleSelectChange("preferred_vendor", value)}
            >
              <SelectTrigger id="preferred_vendor">
                <SelectValue placeholder="Select a vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.vendor_name}>
                    {vendor.vendor_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="standard_unit_cost" className="font-medium">Standard Unit Cost <span className="text-red-500">*</span></Label>
            <Input
              id="standard_unit_cost"
              name="standard_unit_cost"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.standard_unit_cost || ""}
              onChange={handleChange}
              placeholder="Enter unit cost"
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
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
              {isSubmitting ? "Creating..." : "Create Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
