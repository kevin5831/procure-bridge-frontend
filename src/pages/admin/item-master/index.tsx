
import { useEffect, useState } from "react";
import { ItemMasterTable } from "./components/ItemMasterTable";
import { CreateItemMasterDialog } from "./components/CreateItemMasterDialog";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemMaster } from "./types";
import { Helmet } from "react-helmet";

export default function ItemMasterPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { data: itemMasters, isLoading, refetch } = useQuery({
    queryKey: ["itemMasters"],
    queryFn: fetchItemMasters,
  });
  
  // Mock function to fetch item masters
  async function fetchItemMasters() {
    // This would be replaced with an actual API call
    console.log("Fetching item masters");
    return [
      {
        id: "1",
        item_name: "Dell XPS 15 Laptop",
        category: "IT Equipment",
        item_tag_code: "IT-001",
        description: "High-performance laptop for developers",
        min_quantity: 1,
        max_quantity: 10,
        preferred_vendor: "Dell Technologies",
        standard_unit_cost: 1200,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attachments: ["/placeholder.svg"]
      },
      {
        id: "2",
        item_name: "Office Desk Chair",
        category: "Furniture",
        item_tag_code: "FUR-001",
        description: "Ergonomic office chair",
        min_quantity: 5,
        max_quantity: 50,
        preferred_vendor: "Office Depot",
        standard_unit_cost: 250,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attachments: []
      },
      {
        id: "3",
        item_name: "MacBook Pro M2",
        category: "IT Equipment",
        item_tag_code: "IT-002",
        description: "Apple MacBook Pro with M2 chip",
        min_quantity: 1,
        max_quantity: 5,
        preferred_vendor: "Apple Inc.",
        standard_unit_cost: 1800,
        is_active: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attachments: ["/placeholder.svg", "/placeholder.svg"]
      }
    ] as ItemMaster[];
  }

  return (
    <>
      <Helmet>
        <title>Item Master | Asseter</title>
      </Helmet>
      
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Item Master</h1>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>
        
        <ItemMasterTable 
          items={itemMasters || []} 
          isLoading={isLoading} 
          onRefresh={refetch}
        />
        
        <CreateItemMasterDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={() => {
            refetch();
            setIsCreateDialogOpen(false);
          }}
        />
      </div>
    </>
  );
}
