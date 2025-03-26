
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VendorList } from "@/components/maintenance/vendor/VendorList";
import { CreateVendorDialog } from "@/components/maintenance/vendor/CreateVendorDialog";
import { HorizontalAssetsTabs } from "@/components/assets/HorizontalAssetsTabs";

export default function Vendors() {
  const [isCreateVendorOpen, setIsCreateVendorOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Vendors</h1>
          <p className="text-muted-foreground">Manage your organization's service providers and suppliers</p>
        </div>
        <Button 
          onClick={() => setIsCreateVendorOpen(true)}
          className="inline-flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Vendor
        </Button>
      </div>

      <HorizontalAssetsTabs tabSet="vendors" />

      <div className="space-y-4">
        <VendorList />
      </div>
      
      <CreateVendorDialog
        open={isCreateVendorOpen}
        onOpenChange={setIsCreateVendorOpen}
      />
    </main>
  );
}
