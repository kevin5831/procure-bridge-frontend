import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectionSettings } from "@/components/finance/erp/ConnectionSettings";
import { AccountMapping } from "@/components/finance/erp/AccountMapping";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Barcode, Database, Building2 } from "lucide-react";
import { BarcodeConfiguration } from "@/components/finance/barcode/BarcodeConfiguration";

const formSchema = z.object({
  erpSystem: z.string().min(1, "ERP system is required"),
  apiEndpoint: z.string().url("Please enter a valid URL"),
  syncFrequency: z.string().min(1, "Sync frequency is required"),
  assetAccount: z.string().min(1, "Asset account is required"),
  depreciationExpenseAccount: z.string().min(1, "Depreciation expense account is required"),
  accumulatedDepreciationAccount: z.string().min(1, "Accumulated depreciation account is required"),
});

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("erp");
  const [testingConnection, setTestingConnection] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      erpSystem: "",
      apiEndpoint: "",
      syncFrequency: "",
      assetAccount: "",
      depreciationExpenseAccount: "",
      accumulatedDepreciationAccount: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Saving integration settings:", data);
      toast.success("Integration settings saved successfully");
    } catch (error) {
      toast.error("Failed to save integration settings");
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Connection test successful!");
    } catch (error) {
      toast.error("Connection test failed");
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Integrations</h1>
        <p className="text-muted-foreground">
          Configure external system integrations and connections
        </p>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="erp" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="erp" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              ERP Integration
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Banking Integration
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <Barcode className="h-4 w-4" />
              Barcode/RFID
            </TabsTrigger>
          </TabsList>

          <TabsContent value="erp">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <ConnectionSettings
                    form={form}
                    testingConnection={testingConnection}
                    onTestConnection={handleTestConnection}
                  />
                  <AccountMapping form={form} />
                </div>
                <Button type="submit" className="ml-auto">
                  Save Changes
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="banking">
            <Card>
              <CardHeader>
                <CardTitle>Core Banking Integration</CardTitle>
                <CardDescription>
                  Connect your asset management system with your core banking infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Core banking integration setup coming soon. This will allow automatic
                  synchronization of branch/cost-center data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="barcode">
            <BarcodeConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
