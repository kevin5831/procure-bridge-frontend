
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationsList } from "@/components/admin/locations/LocationsList";
import { CompanyInfoForm } from "@/components/admin/company/CompanyInfoForm";

export default function CompanySetup() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Company Setup</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted p-1 w-full sm:w-auto inline-flex h-auto space-x-1">
          <TabsTrigger 
            value="general"
            className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted-foreground/10 transition-colors"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="locations"
            className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted-foreground/10 transition-colors"
          >
            Locations
          </TabsTrigger>
          <TabsTrigger 
            value="preferences"
            className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted-foreground/10 transition-colors"
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your company's basic information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <LocationsList />
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Company Preferences</CardTitle>
              <CardDescription>
                Configure your company's preferences and default settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Preferences configuration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
