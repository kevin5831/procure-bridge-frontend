import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/custom-select";
import { RefreshCw, DatabaseIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const erpTypes = [
  "SAP",
  "Oracle ERP",
  "Microsoft Dynamics",
  "NetSuite",
  "Sage Intacct",
  "QuickBooks",
];

const syncFrequencies = ["realtime", "daily", "weekly", "monthly"];

interface ConnectionSettingsProps {
  form: UseFormReturn<any>;
  testingConnection: boolean;
  onTestConnection: () => void;
}

export function ConnectionSettings({ form, testingConnection, onTestConnection }: ConnectionSettingsProps) {
  const erpTypeOptions = erpTypes.map(type => ({
    value: type,
    label: type
  }));

  const syncFrequencyOptions = syncFrequencies.map(freq => ({
    value: freq,
    label: freq
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Settings</CardTitle>
        <CardDescription>
          Configure your ERP system connection details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="erpSystem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ERP System</FormLabel>
              <FormControl>
                <CustomSelect
                  options={erpTypeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select ERP system"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiEndpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Endpoint</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://api.erp.example.com" 
                  {...field} 
                  className="font-mono text-sm"
                />
              </FormControl>
              <FormDescription>
                The base URL for your ERP system's API
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="syncFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Synchronization Frequency</FormLabel>
              <FormControl>
                <CustomSelect
                  options={syncFrequencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select frequency"
                />
              </FormControl>
              <FormDescription>
                How often to sync depreciation entries with ERP
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          onClick={onTestConnection}
          disabled={testingConnection}
          className="w-full mt-4"
        >
          {testingConnection ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <DatabaseIcon className="mr-2 h-4 w-4" />
              Test Connection
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
