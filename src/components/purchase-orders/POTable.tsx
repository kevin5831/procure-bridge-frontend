
import { PurchaseOrder } from "@/pages/purchase-orders/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface POTableProps {
  purchaseOrders: PurchaseOrder[];
  isLoading: boolean;
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    DRAFT: { class: "bg-gray-500", label: "Draft" },
    SUBMITTED: { class: "bg-blue-500", label: "Submitted" },
    APPROVED: { class: "bg-green-500", label: "Approved" },
    REJECTED: { class: "bg-red-500", label: "Rejected" }
  };

  const config = statusConfig[status] || { class: "bg-gray-500", label: status };
  return (
    <Badge className={config.class}>
      {config.label}
    </Badge>
  );
};

export function POTable({ purchaseOrders, isLoading }: POTableProps) {
  const navigate = useNavigate();
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PO Number</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseOrders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No purchase orders found
            </TableCell>
          </TableRow>
        ) : (
          purchaseOrders.map((po) => (
            <TableRow key={po.id}>
              <TableCell className="font-medium">{po.po_number}</TableCell>
              <TableCell>{po.supplier_name}</TableCell>
              <TableCell>{formatDate(po.po_date)}</TableCell>
              <TableCell>${po.total_amount.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(po.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/purchase-orders/${po.id}`)}
                    className="flex items-center gap-1 hover:bg-primary/10"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline-block md:ml-1">View</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
