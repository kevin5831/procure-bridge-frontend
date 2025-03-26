
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Paperclip } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ItemMaster } from "../types";
import { ViewItemMasterDialog } from "./ViewItemMasterDialog";
import { EditItemMasterDialog } from "./EditItemMasterDialog";

interface ItemMasterTableProps {
  items: ItemMaster[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function ItemMasterTable({ items, isLoading, onRefresh }: ItemMasterTableProps) {
  const [viewItem, setViewItem] = useState<ItemMaster | null>(null);
  const [editItem, setEditItem] = useState<ItemMaster | null>(null);
  
  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tag Code</TableHead>
            <TableHead>Min Qty</TableHead>
            <TableHead>Max Qty</TableHead>
            <TableHead>Preferred Vendor</TableHead>
            <TableHead>Standard Unit Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6">
                No items found. Create your first item by clicking "Add New Item".
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className={!item.is_active ? "opacity-60" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {item.item_name}
                    {item.attachments && item.attachments.length > 0 && (
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.item_tag_code}</TableCell>
                <TableCell>{item.min_quantity}</TableCell>
                <TableCell>{item.max_quantity}</TableCell>
                <TableCell>{item.preferred_vendor || "-"}</TableCell>
                <TableCell>{formatCurrency(item.standard_unit_cost)}</TableCell>
                <TableCell>
                  <Badge variant={item.is_active ? "outline" : "destructive"} className="whitespace-nowrap">
                    {item.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setViewItem(item)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setEditItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {viewItem && (
        <ViewItemMasterDialog
          item={viewItem}
          open={!!viewItem}
          onOpenChange={(open) => !open && setViewItem(null)}
        />
      )}
      
      {editItem && (
        <EditItemMasterDialog
          item={editItem}
          open={!!editItem}
          onOpenChange={(open) => !open && setEditItem(null)}
          onSuccess={() => {
            onRefresh();
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
