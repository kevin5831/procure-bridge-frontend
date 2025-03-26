
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Package, AlertCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CreateAssetForm } from "@/components/assets/CreateAssetForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AssetLocation } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const locations: AssetLocation[] = [
  {
    id: "1",
    name: "Addis Ababa HQ",
    code: "ADD-001",
    type: "Head Office",
    country: "Ethiopia",
    city: "Addis Ababa"
  },
  {
    id: "2",
    name: "Dire Dawa Branch",
    code: "DIR-001",
    type: "Branch",
    country: "Ethiopia",
    city: "Dire Dawa"
  },
  {
    id: "3",
    name: "Bahir Dar Office",
    code: "BAH-001",
    type: "Branch",
    country: "Ethiopia",
    city: "Bahir Dar"
  },
  {
    id: "4",
    name: "Hawassa Center",
    code: "HAW-001",
    type: "Branch",
    country: "Ethiopia",
    city: "Hawassa"
  }
];

const categories = ["IT Equipment", "Furniture", "Vehicle", "Office Equipment", "Manufacturing Equipment"];

export default function CreateAssetFromPO() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [assetData, setAssetData] = useState<any>(null);
  const [creatingAsset, setCreatingAsset] = useState(false);

  const { data: purchaseOrders } = supabase.from('purchase_orders').select('*');

  // Filter to only show approved purchase orders
  const approvedPOs = purchaseOrders?.filter(po => po.status === "APPROVED") || [];
  
  const filteredPOs = approvedPOs.filter(po => 
    po.po_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPODetails = purchaseOrders?.find(po => po.id === selectedPO);

  const handleCreateAsset = () => {
    if (!selectedPO) {
      toast.error("Please select a purchase order");
      return;
    }
    
    if (!selectedLocation) {
      toast.error("Please select a location for the asset");
      return;
    }
    
    setCreatingAsset(true);
    
    // Prepare asset data from the selected PO
    setAssetData({
      name: selectedPODetails?.supplier_name ? `${selectedPODetails.supplier_name} Purchase` : "New Asset",
      category: "IT Equipment", // Default category, will be selectable in form
      locationId: selectedLocation,
      purchasePrice: selectedPODetails?.total_amount.toString() || "0",
      purchaseDate: selectedPODetails?.po_date || new Date().toISOString().split('T')[0],
    });
    
    setIsCreateOpen(true);
    setCreatingAsset(false);
  };

  const handleCreateSuccess = () => {
    setIsCreateOpen(false);
    toast.success("Asset created successfully!");
    setSelectedPO(null);
    setAssetData(null);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Asset from Purchase Order</h1>
        <p className="text-muted-foreground">Select an approved purchase order to create a new asset</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Select Purchase Order</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Approved Only
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
              <Input
                type="search"
                placeholder="Search purchase orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredPOs.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <p>No approved purchase orders found</p>
                  <p className="text-sm mt-1">Only approved purchase orders can be converted to assets</p>
                </div>
              ) : (
                filteredPOs.map((po) => (
                  <div 
                    key={po.id}
                    onClick={() => setSelectedPO(po.id)}
                    className={`p-3 rounded-md border cursor-pointer hover:bg-muted/30 transition-colors ${
                      selectedPO === po.id ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{po.po_number}</div>
                        <div className="text-sm text-muted-foreground">{po.supplier_name}</div>
                      </div>
                      <Badge variant="default" className="bg-green-600 text-white">
                        {po.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Date: {new Date(po.po_date).toLocaleDateString()}</span>
                      <span className="font-medium">${po.total_amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Purchase Order Details</CardTitle>
            {selectedPO && (
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardHeader>
          <CardContent>
            {!selectedPO ? (
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium">No purchase order selected</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Select an approved purchase order from the left to view its details
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">PO Number</p>
                      <p className="font-medium text-lg">{selectedPODetails?.po_number}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p>{new Date(selectedPODetails?.po_date || "").toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant="default" className="bg-green-600 text-white">
                        {selectedPODetails?.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Supplier</p>
                      <p className="font-medium text-lg">{selectedPODetails?.supplier_name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold">${selectedPODetails?.total_amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-5 text-lg"
                    onClick={handleCreateAsset}
                    disabled={!selectedPO || !selectedLocation || creatingAsset}
                  >
                    <Package className="h-5 w-5" />
                    {creatingAsset ? "Creating..." : "Create Asset"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Asset from Purchase Order</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <CreateAssetForm
              onSuccess={handleCreateSuccess}
              categories={categories}
              locations={locations}
              defaultValues={assetData}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
