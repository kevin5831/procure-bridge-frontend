
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AssetCategorySelect } from "./form/AssetCategorySelect";
import { RevaluationTypeSelect } from "./form/RevaluationTypeSelect";
import { PercentageInput } from "./form/PercentageInput";
import { DatePicker } from "./form/DatePicker";
import { ReasonInput } from "./form/ReasonInput";
import { FileUploadField } from "./form/FileUploadField";
import type { ImpairmentFormData, AssetCategory } from "./types";

interface ImpairmentFormProps {
  form: UseFormReturn<ImpairmentFormData>;
  onSubmit: (values: ImpairmentFormData) => Promise<void>;
  categories: AssetCategory[];
}

export function ImpairmentForm({ form, onSubmit, categories = [] }: ImpairmentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AssetCategorySelect form={form} categories={categories} />
        <PercentageInput form={form} categories={categories} />
        <RevaluationTypeSelect form={form} />
        <DatePicker form={form} />
        <ReasonInput form={form} />
        <FileUploadField form={form} />
        <Button 
          type="submit" 
          className="w-full"
          disabled={!form.watch("categoryId") || !form.watch("revaluationPercentage")}
        >
          Record Category Revaluation
        </Button>
      </form>
    </Form>
  );
}
