
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePOSidePanel } from "@/components/purchase-orders/CreatePOSidePanel";
import { POTable } from "@/components/purchase-orders/POTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PurchaseOrder } from "./types";

export default function PurchaseOrders() {
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);

  const { data: purchaseOrders, isLoading, refetch } = useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PurchaseOrder[];
    }
  });

  const handleCreateSuccess = () => {
    setIsCreatePanelOpen(false);
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Manage all purchase orders for your organization
          </p>
        </div>
        <Button onClick={() => setIsCreatePanelOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <POTable 
          purchaseOrders={purchaseOrders || []} 
          isLoading={isLoading}
        />
      </div>

      {/* Create PO Side Panel */}
      <CreatePOSidePanel
        open={isCreatePanelOpen}
        onClose={() => setIsCreatePanelOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
