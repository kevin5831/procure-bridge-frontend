
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { CreateRequestForm, AssetCategory } from "../types";
import { createDefaultLineItem } from "../components/line-item";

export function useCreateRequest(onComplete: () => void, initialCategory: AssetCategory = "IT Equipment") {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CreateRequestForm>({
    defaultValues: {
      title: "",
      costCenter: "",
      justification: "",
      lineItems: [createDefaultLineItem()],
    },
  });

  // Initialize first line item with correct category
  useEffect(() => {
    const firstItem = form.getValues("lineItems")[0];
    if (firstItem && initialCategory) {
      form.setValue("lineItems.0.assetCategory", initialCategory);
    }
  }, [form, initialCategory]);

  const { watch } = form;
  const lineItems = watch("lineItems") || [];
  
  const totalCost = lineItems.reduce((total, item) => {
    return total + ((item.quantity || 0) * (item.unitCost || 0));
  }, 0);

  const onSubmit = async (data: CreateRequestForm) => {
    console.log('Starting form submission with data:', data);
    if (isSubmitting) {
      console.log('Submission already in progress, returning');
      return;
    }

    // Validate that at least one line item exists
    if (!data.lineItems || data.lineItems.length === 0) {
      toast.error("Please add at least one item to your request");
      return;
    }

    // Validate each line item
    for (let i = 0; i < data.lineItems.length; i++) {
      const item = data.lineItems[i];
      
      // Check quantity
      if (!item.quantity || item.quantity <= 0) {
        toast.error(`Item #${i+1}: Please enter a valid quantity greater than 0`);
        return;
      }

      // Check unit cost
      if (item.unitCost < 0) {
        toast.error(`Item #${i+1}: Please enter a valid unit cost (must be 0 or greater)`);
        return;
      }

      // Check if item has a title
      if (!item.title) {
        toast.error(`Item #${i+1}: Please specify an item by selecting from Item Master or entering details manually`);
        return;
      }

      // Check if asset category is specified
      if (!item.assetCategory) {
        toast.error(`Item #${i+1}: Please select an asset category`);
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      // Mock request creation
      console.log('Creating request:', {
        ...data,
        status: 'DRAFT',
        totalCost: totalCost
      });

      toast.success("Request created successfully!");
      onComplete();
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    totalCost,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
