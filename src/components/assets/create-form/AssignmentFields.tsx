
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";

interface AssignmentFieldsProps {
  form: UseFormReturn<FormValues>;
  showAssignment: boolean;
  setShowAssignment: (show: boolean) => void;
}

export function AssignmentFields({ form, showAssignment, setShowAssignment }: AssignmentFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="assignToEmployee"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  setShowAssignment(!!checked);
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Assign to Employee</FormLabel>
              <FormDescription>
                Check this if you want to assign this asset to an employee immediately
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {showAssignment && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <FormControl>
                  <Input placeholder="Employee name or ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter shipping address if applicable..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </>
  );
}
