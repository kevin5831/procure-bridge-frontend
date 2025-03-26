
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { impairmentFormSchema, type ImpairmentFormData, type AssetCategory } from "@/components/finance/impairment/types";
import { ImpairmentForm } from "@/components/finance/impairment/ImpairmentForm";
import { ImpairmentHeader } from "@/components/finance/impairment/ImpairmentHeader";
import { ImpairmentNotes } from "@/components/finance/impairment/ImpairmentNotes";
import { toast } from "sonner";

export default function ImpairmentRevaluation() {
  // Mock asset categories for demonstration
  const [categories] = useState<AssetCategory[]>([
    { 
      id: "cat-1", 
      name: "IT Equipment", 
      totalValue: 45000, 
      assetCount: 25 
    },
    { 
      id: "cat-2", 
      name: "Office Furniture", 
      totalValue: 22000, 
      assetCount: 48 
    },
    { 
      id: "cat-3", 
      name: "Vehicles", 
      totalValue: 120000, 
      assetCount: 5 
    },
    { 
      id: "cat-4", 
      name: "Building Improvements", 
      totalValue: 350000, 
      assetCount: 3 
    },
  ]);

  const form = useForm<ImpairmentFormData>({
    resolver: zodResolver(impairmentFormSchema),
    defaultValues: {
      categoryId: "",
      revaluationType: "upward",
      revaluationPercentage: 0,
      effectiveDate: new Date(),
      reason: "",
      attachments: [],
    },
  });

  const handleSubmit = async (values: ImpairmentFormData) => {
    console.log("Form submitted:", values);
    
    const selectedCategory = categories.find(cat => cat.id === values.categoryId);
    
    if (selectedCategory) {
      toast.success(
        `Successfully recorded ${values.revaluationType} revaluation for ${selectedCategory.name} category. 
        ${selectedCategory.assetCount} assets affected with ${values.revaluationPercentage}% change.`
      );
    }
    
    // Here we would typically send the data to the backend
    form.reset();
  };

  return (
    <div className="space-y-6">
      <ImpairmentHeader />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Category Revaluation</CardTitle>
              <CardDescription>
                Enter revaluation details for an entire asset category according to IFRS standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpairmentForm 
                form={form} 
                onSubmit={handleSubmit}
                categories={categories}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ImpairmentNotes />
        </div>
      </div>
    </div>
  );
}
