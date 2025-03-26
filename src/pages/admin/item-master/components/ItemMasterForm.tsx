
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { CreateItemMasterForm, UpdateItemMasterForm } from "../types";
import { Combobox } from "@/components/ui/combobox";
import { Paperclip, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ItemMasterFormProps {
  form: UseFormReturn<CreateItemMasterForm | UpdateItemMasterForm>;
  categories: readonly string[];
}

export function ItemMasterForm({ form, categories }: ItemMasterFormProps) {
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  
  const { data: vendors = [] } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      return [
        { id: "1", name: "Dell Technologies" },
        { id: "2", name: "HP Inc." },
        { id: "3", name: "Lenovo Group" },
        { id: "4", name: "Apple Inc." },
        { id: "5", name: "Samsung Electronics" },
        { id: "6", name: "Office Depot" },
        { id: "7", name: "Staples Inc." },
      ];
    },
  });
  
  const vendorOptions = vendors.map(vendor => ({
    label: vendor.name,
    value: vendor.name
  }));
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...attachmentFiles, ...newFiles];
      setAttachmentFiles(updatedFiles);
      form.setValue('attachments', updatedFiles);
    }
  };
  
  const removeAttachment = (index: number) => {
    const updatedFiles = [...attachmentFiles];
    updatedFiles.splice(index, 1);
    setAttachmentFiles(updatedFiles);
    form.setValue('attachments', updatedFiles);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="item_name"
        rules={{ required: "Item name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Name *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Dell XPS 15 Laptop" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category"
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="item_tag_code"
        rules={{ required: "Tag code is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tag Code *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., IT-001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter item description..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="min_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Quantity</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value || '0'))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="max_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Quantity</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min="0"
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value || '0'))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="preferred_vendor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Vendor</FormLabel>
            <FormControl>
              <Combobox
                options={vendorOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Search for a vendor..."
                searchPlaceholder="Type to search vendors..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="standard_unit_cost"
        rules={{ required: "Standard unit cost is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Standard Unit Cost *</FormLabel>
            <FormControl>
              <Input 
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value || '0'))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Status</FormLabel>
              <div className="text-sm text-muted-foreground">
                {field.value ? "Active" : "Inactive"}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="attachments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mt-1">
                {attachmentFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                    <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0" 
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Paperclip className="h-4 w-4" />
                  Upload Specification Sheets or Product Images
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
