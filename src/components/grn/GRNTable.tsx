
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GRN } from "@/types/grn";
import { formatDate } from "@/lib/utils";

interface GRNTableProps {
  grns: GRN[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const getStatusBadge = (status: GRN['status']) => {
  const statusConfig = {
    DRAFT: { class: "bg-gray-500", label: "Draft" },
    SUBMITTED: { class: "bg-blue-500", label: "Submitted" },
    CHECKED: { class: "bg-yellow-500", label: "Checked" },
    AUTHORIZED: { class: "bg-green-500", label: "Authorized" },
    REJECTED: { class: "bg-red-500", label: "Rejected" }
  };

  const config = statusConfig[status];
  return (
    <Badge className={config.class}>
      {config.label}
    </Badge>
  );
};

export function GRNTable({
  grns,
  isLoading,
  currentPage,
  itemsPerPage,
  onPageChange
}: GRNTableProps) {
  const navigate = useNavigate();
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = grns.slice(startIndex, endIndex);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>GRN ID</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Received Date</TableHead>
          <TableHead>Total Items</TableHead>
          <TableHead>Total Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentItems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              No GRNs found
            </TableCell>
          </TableRow>
        ) : (
          currentItems.map((grn) => (
            <TableRow key={grn.id}>
              <TableCell>{grn.id.slice(0, 8)}</TableCell>
              <TableCell>{grn.supplier_name}</TableCell>
              <TableCell>{formatDate(grn.received_date)}</TableCell>
              <TableCell>{grn.total_items}</TableCell>
              <TableCell>${grn.total_value.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(grn.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/grn/${grn.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {grn.status === 'SUBMITTED' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                        onClick={() => {/* Will implement check/approve */}}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => {/* Will implement reject */}}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
