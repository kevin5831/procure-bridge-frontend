
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

interface AccountMappingProps {
  form: UseFormReturn<any>;
}

export function AccountMapping({ form }: AccountMappingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Mapping</CardTitle>
        <CardDescription>
          Map depreciation accounts to your ERP's GL accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="assetAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fixed Asset Account</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1600" {...field} className="font-mono" />
              </FormControl>
              <FormDescription>
                The GL account for fixed assets
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="depreciationExpenseAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depreciation Expense Account</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 6800" {...field} className="font-mono" />
              </FormControl>
              <FormDescription>
                The GL account for depreciation expenses
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accumulatedDepreciationAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accumulated Depreciation Account</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1610" {...field} className="font-mono" />
              </FormControl>
              <FormDescription>
                The GL account for accumulated depreciation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
