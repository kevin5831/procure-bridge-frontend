
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Filter } from "lucide-react";
import { GRNTable } from "@/components/grn/GRNTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GRN } from "@/types/grn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy data for development
const dummyGRNs: GRN[] = [
  {
    id: "GRN001",
    supplier_name: "Tech Solutions Ltd",
    received_date: "2024-03-15",
    status: "SUBMITTED",
    created_by: "user1",
    created_at: "2024-03-15T10:00:00Z",
    updated_at: "2024-03-15T10:00:00Z",
    total_items: 5,
    total_value: 2500.00,
    notes: "Regular IT equipment delivery",
    workflow_step: 2,
    items: []
  },
  {
    id: "GRN002",
    supplier_name: "Office Furniture Co",
    received_date: "2024-03-14",
    status: "AUTHORIZED",
    created_by: "user1",
    created_at: "2024-03-14T09:30:00Z",
    updated_at: "2024-03-14T15:00:00Z",
    total_items: 10,
    total_value: 5000.00,
    notes: "Office chairs and desks",
    workflow_step: 4,
    items: []
  },
  {
    id: "GRN003",
    supplier_name: "Electronics Plus",
    received_date: "2024-03-13",
    status: "CHECKED",
    created_by: "user1",
    created_at: "2024-03-13T14:20:00Z",
    updated_at: "2024-03-13T16:45:00Z",
    total_items: 3,
    total_value: 1800.00,
    notes: "Monitors and accessories",
    workflow_step: 3,
    items: []
  },
  {
    id: "GRN004",
    supplier_name: "Network Systems Inc",
    received_date: "2024-03-12",
    status: "DRAFT",
    created_by: "user1",
    created_at: "2024-03-12T11:15:00Z",
    updated_at: "2024-03-12T11:15:00Z",
    total_items: 8,
    total_value: 3200.00,
    notes: "Network equipment",
    workflow_step: 1,
    items: []
  },
  {
    id: "GRN005",
    supplier_name: "Security Solutions",
    received_date: "2024-03-11",
    status: "REJECTED",
    created_by: "user1",
    created_at: "2024-03-11T09:00:00Z",
    updated_at: "2024-03-11T13:30:00Z",
    total_items: 4,
    total_value: 1200.00,
    notes: "CCTV cameras and accessories",
    workflow_step: 1,
    items: []
  }
];

export default function GRNList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const ITEMS_PER_PAGE = 10;

  const { data: grns, isLoading } = useQuery({
    queryKey: ['grns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goods_receipt_notes')
        .select(`
          *,
          items:grn_items(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Return dummy data for now
      return dummyGRNs;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Goods Receipt Notes</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track received goods
          </p>
        </div>
        <Button 
          onClick={() => navigate("/grn/create")}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Create GRN
        </Button>
      </div>

      <Card className="shadow-md border overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <CardTitle className="text-lg">GRN Records</CardTitle>
              <CardDescription>View and manage your goods receipt notes</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by ID or supplier..."
                  className="pl-9 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  defaultValue="all"
                  onValueChange={setFilterStatus}
                  value={filterStatus}
                >
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="SUBMITTED">Submitted</SelectItem>
                    <SelectItem value="CHECKED">Checked</SelectItem>
                    <SelectItem value="AUTHORIZED">Authorized</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <GRNTable
            grns={grns || []}
            isLoading={isLoading}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
