import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

const getMockRequests = () => {
  return [
    {
      id: "REQ-2024-001",
      title: "MacBook Pro M3 for Engineering Team",
      department: "Engineering",
      status: "In Approval",
      date: "2024-01-15",
      totalCost: 2799.00,
      requester: "John Smith",
      currency: "USD",
      justification: "Our engineering team needs high-performance laptops for development work. Current machines are 4+ years old.",
      items: [
        {
          id: 1,
          description: "MacBook Pro M3 Max",
          quantity: 1,
          unitCost: 2799.00
        }
      ]
    },
    {
      id: "REQ-2024-004",
      title: "Conference Room AV Equipment",
      department: "IT",
      status: "In Approval",
      date: "2024-01-22",
      totalCost: 5500.00,
      requester: "Alice Brown",
      currency: "USD",
      justification: "Upgrade main conference room with modern AV equipment for better hybrid meetings",
      items: [
        {
          id: 1,
          description: "75\" 4K Display",
          quantity: 1,
          unitCost: 3000.00
        },
        {
          id: 2,
          description: "Video Conferencing System",
          quantity: 1,
          unitCost: 2500.00
        }
      ]
    }
  ].filter(request => request.status === "In Approval");
};

export default function Approvals() {
  const requests = getMockRequests();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleApprovalClick = (e: React.MouseEvent, request: any) => {
    e.preventDefault();
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    try {
      const { error: requestError } = await supabase
        .from('requests')
        .update({ 
          status: 'APPROVED',
          approved_at: new Date().toISOString(),
          approved_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', selectedRequest.id);

      if (requestError) throw requestError;

      toast({
        title: "Request Approved",
        description: "Request has been approved successfully."
      });

      setApprovalDialogOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReject = (e: React.MouseEvent, requestId: string) => {
    e.preventDefault();
    toast({
      title: "Request Rejected",
      description: `Request ${requestId} has been rejected.`,
      variant: "destructive"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pending Approvals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {requests.length} requests awaiting your approval
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Link key={request.id} to={`/requests/${request.id}`}>
            <Card className="hover:bg-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">{request.title}</h2>
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                        Awaiting Your Approval
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{request.id}</span>
                      <span>•</span>
                      <span>{request.department}</span>
                      <span>•</span>
                      <span>{request.requester}</span>
                      <span>•</span>
                      <span>{request.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{request.justification}</p>
                    {request.items && request.items.length > 0 && (
                      <div className="mt-3 text-sm">
                        <p className="font-medium">Items:</p>
                        {request.items.map(item => (
                          <div key={item.id} className="flex justify-between text-muted-foreground">
                            <span>{item.quantity}x {item.description}</span>
                            <span>{new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: request.currency
                            }).format(item.unitCost)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-semibold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: request.currency
                      }).format(request.totalCost)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Submitted on {request.date}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={(e) => handleReject(e, request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={(e) => handleApprovalClick(e, request)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {requests.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No pending approvals at this time
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
