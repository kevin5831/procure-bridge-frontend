
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Star, FileText } from "lucide-react";
import type { Vendor } from "@/types/vendor";
import { VendorDetailDialog } from "./VendorDetailDialog";
import { CreateVendorDialog } from "./CreateVendorDialog";

// Mock data - replace with actual data fetching
const mockVendors: Vendor[] = [
  {
    id: "VEN-001",
    name: "Cool Tech Services",
    email: "service@cooltech.com",
    phone: "555-0123",
    category: ["HVAC", "Electronics"],
    rating: 4.5,
    status: "Active",
  },
  {
    id: "VEN-002",
    name: "PrintFix Solutions",
    email: "support@printfix.com",
    phone: "555-0124",
    category: ["Printers", "IT Equipment"],
    rating: 4.0,
    status: "Active",
  },
];

export function VendorList() {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vendor Management</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">{vendor.email}</p>
                  </div>
                </TableCell>
                <TableCell>{vendor.category.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {vendor.rating?.toFixed(1) || "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    vendor.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {vendor.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setIsDetailOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <VendorDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        vendor={selectedVendor}
      />

      <CreateVendorDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
