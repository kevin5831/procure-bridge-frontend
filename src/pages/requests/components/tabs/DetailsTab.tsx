
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusColor } from "../utils";
import { PackageCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DetailsTabProps {
  request: any; // TODO: Add proper type
}

export function DetailsTab({ request }: DetailsTabProps) {
  // Fetch assets associated with this request's GRN
  const { data: assets } = useQuery({
    queryKey: ['request-assets', request.id],
    queryFn: async () => {
      const { data: grn } = await supabase
        .from('goods_receipt_notes')
        .select('id')
        .eq('request_id', request.id)
        .single();

      if (!grn) return [];

      const { data: assets } = await supabase
        .from('assets')
        .select('*')
        .eq('grn_id', grn.id);

      return assets || [];
    },
    enabled: !!request.id
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Request Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Request ID</p>
                <p>{request.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant="secondary" className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created Date</p>
                <p>{request.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p>{request.department}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Financial Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currency</p>
                <p>{request.currency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="font-bold">${request.totalCost.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {assets && assets.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <PackageCheck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Associated Assets</h3>
                </div>
                <div className="space-y-3">
                  {assets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Asset #{asset.asset_number}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {asset.status}
                        </Badge>
                      </div>
                      {asset.location && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Location: {asset.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
