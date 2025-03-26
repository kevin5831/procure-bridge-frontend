
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, X, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { GRN } from "@/types/grn";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function GRNDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [grn, setGrn] = useState<GRN | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchGRN = async () => {
      if (!id) return;
      
      console.log('Fetching GRN with ID:', id);
      
      try {
        const { data: grnData, error: grnError } = await supabase
          .from('goods_receipt_notes')
          .select(`
            *,
            items:grn_items(*),
            approval_history:grn_approval_history(*)
          `)
          .eq('id', id)
          .maybeSingle();

        console.log('GRN Data:', grnData);
        console.log('GRN Error:', grnError);

        if (grnError) throw grnError;

        if (!grnData) {
          toast({
            title: "GRN not found",
            description: "The requested GRN could not be found.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        setGrn(grnData as GRN);
      } catch (error) {
        console.error('Error fetching GRN:', error);
        toast({
          title: "Error",
          description: "Failed to load GRN details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGRN();
  }, [id, toast]);

  const handleStatusUpdate = async (newStatus: GRN['status']) => {
    if (!grn || !id || isProcessing) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('goods_receipt_notes')
        .update({ 
          status: newStatus,
          ...(newStatus === 'SUBMITTED' && { submitted_at: new Date().toISOString() }),
          ...(newStatus === 'CHECKED' && { checked_at: new Date().toISOString() }),
          ...(newStatus === 'AUTHORIZED' && { authorized_at: new Date().toISOString() })
        })
        .eq('id', id);

      if (error) throw error;

      // Refresh GRN data
      const { data: updatedGrn, error: fetchError } = await supabase
        .from('goods_receipt_notes')
        .select(`
          *,
          items:grn_items(*),
          approval_history:grn_approval_history(*)
        `)
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      setGrn(updatedGrn as GRN);
      toast({
        title: "Success",
        description: `GRN status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating GRN status:', error);
      toast({
        title: "Error",
        description: "Failed to update GRN status",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadgeColor = (status: GRN['status']) => {
    const statusColors = {
      DRAFT: "bg-gray-500/10 text-gray-500",
      SUBMITTED: "bg-blue-500/10 text-blue-500",
      CHECKED: "bg-yellow-500/10 text-yellow-500",
      AUTHORIZED: "bg-green-500/10 text-green-500",
      REJECTED: "bg-red-500/10 text-red-500",
    };
    return statusColors[status] || statusColors.DRAFT;
  };

  const renderActionButtons = () => {
    if (!grn) return null;

    switch (grn.status) {
      case 'DRAFT':
        return (
          <Button 
            onClick={() => handleStatusUpdate('SUBMITTED')}
            disabled={isProcessing}
          >
            <Clock className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
        );
      case 'SUBMITTED':
        return (
          <div className="space-x-2">
            <Button 
              onClick={() => handleStatusUpdate('CHECKED')}
              disabled={isProcessing}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Checked
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleStatusUpdate('REJECTED')}
              disabled={isProcessing}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        );
      case 'CHECKED':
        return (
          <div className="space-x-2">
            <Button 
              onClick={() => handleStatusUpdate('AUTHORIZED')}
              disabled={isProcessing}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Authorize
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleStatusUpdate('REJECTED')}
              disabled={isProcessing}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!grn) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">GRN not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">GRN Details</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Created on {formatDate(grn.created_at || '')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getStatusBadgeColor(grn.status)}>
              {grn.status}
            </Badge>
            {renderActionButtons()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">GRN Number</p>
              <p className="font-medium">{grn.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Supplier</p>
              <p className="font-medium">{grn.supplier_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Received Date</p>
              <p className="font-medium">{formatDate(grn.received_date)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="font-medium">{grn.created_by}</p>
            </div>
          </div>

          <Separator />

          {/* Approval Timeline */}
          {grn.approval_history && grn.approval_history.length > 0 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Approval Timeline</h3>
                <div className="space-y-2">
                  {grn.approval_history.map((history) => (
                    <div
                      key={history.id}
                      className="flex items-start gap-4 p-4 rounded-lg border"
                    >
                      <div className="flex-shrink-0">
                        {history.to_status === 'AUTHORIZED' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : history.to_status === 'REJECTED' ? (
                          <X className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Status changed from {history.from_status || 'NONE'} to{' '}
                          {history.to_status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(history.created_at)}
                        </p>
                        {history.comments && (
                          <p className="text-sm mt-2">{history.comments}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Notes */}
          {grn.notes && (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Notes</h3>
                <p className="text-sm text-muted-foreground">{grn.notes}</p>
              </div>
              <Separator />
            </>
          )}

          {/* Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <div className="space-y-4">
              {grn.items?.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Item Name</p>
                        <p className="font-medium">{item.item_name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{item.asset_category}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{item.quantity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Unit Price</p>
                        <p className="font-medium">${item.unit_price.toFixed(2)}</p>
                      </div>
                      <div className="col-span-full space-y-1">
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                      {item.condition_notes && (
                        <div className="col-span-full space-y-1">
                          <p className="text-sm text-muted-foreground">Condition Notes</p>
                          <p className="text-sm">{item.condition_notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Totals */}
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="font-medium">{grn.total_items}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="font-medium text-lg">${grn.total_value.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attachments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for attachments - will be implemented when storage is set up */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FileText className="h-5 w-5" />
              <span>No attachments found</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
