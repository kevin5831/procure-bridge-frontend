
import { Form } from "@/components/ui/form";
import { RequestFormFields } from "./RequestFormFields";
import { RequestFormActions } from "./RequestFormActions";
import { useCreateRequest } from "../hooks/useCreateRequest";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CreateRequestFormProps {
  onComplete: () => void;
}

export function CreateRequestForm({ onComplete }: CreateRequestFormProps) {
  const { form, isSubmitting, onSubmit } = useCreateRequest(onComplete);

  return (
    <div className="mt-6 animate-fade-in">
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-xl text-primary">Create Purchase Request</CardTitle>
          <CardDescription>Fill in the details to create a new purchase request</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <RequestFormFields form={form} />
              <div className="pt-4 border-t mt-8">
                <RequestFormActions onCancel={onComplete} isSubmitting={isSubmitting} />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
