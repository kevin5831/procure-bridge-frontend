
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";
import { itCategories, conditionGrades } from "./constants";

interface ITAssetFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ITAssetFields({ form }: ITAssetFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="itCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IT Asset Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IT asset type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {itCategories.map((category) => (
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
          name="brandModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand/Model</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Apple MacBook Pro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processor</FormLabel>
              <FormControl>
                <Input placeholder="e.g., M1 Pro, Intel i7" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memory/RAM</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 16GB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 512GB SSD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition Grade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {conditionGrades.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value}>
                      {grade.label}
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
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Space Gray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="conditionNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condition Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add any notes about the condition of the device..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="otherSpecs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Specifications</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Additional specifications (OS, screen size, etc.)..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
