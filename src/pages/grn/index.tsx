
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GRNTable } from "@/components/grn/GRNTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GRN } from "@/types/grn";

export default function GRNListPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
      return data as GRN[];
    }
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Goods Receipt Notes</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track received goods
          </p>
        </div>
        <Button onClick={() => navigate("/grn/create")}>
          <Plus className="mr-2 h-4 w-4" /> Create GRN
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <GRNTable
          grns={grns || []}
          isLoading={isLoading}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
