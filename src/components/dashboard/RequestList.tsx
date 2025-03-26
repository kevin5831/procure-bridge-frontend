
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { PackageCheck, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Progress } from "@/components/ui/progress";

interface RequestListProps {
  showActions?: boolean;
  status?: string;
  showCreateGRN?: boolean;
  grnStatus?: 'PENDING' | 'RECEIVED';
  subtitle?: string;
  filterByCurrentUser?: boolean;
}

export function RequestList({ 
  showActions = true, 
  status, 
  showCreateGRN = false,
  grnStatus = 'PENDING',
  subtitle,
  filterByCurrentUser = true
}: RequestListProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['requests', status, grnStatus, filterByCurrentUser],
    queryFn: async () => {
      const baseQuery = supabase.from('requests').select();

      let finalQuery = baseQuery;
      
      // Apply status and GRN status filters if provided
      if (status && grnStatus) {
        const { data, error } = await baseQuery
          .eq('status', status)
          .eq('grn_status', grnStatus);
        if (error) throw error;
        return data;
      } else if (status) {
        const { data, error } = await baseQuery
          .eq('status', status);
        if (error) throw error;
        return data;
      }

      // Apply user filter if needed
      if (filterByCurrentUser) {
        const { data, error } = await baseQuery
          .eq('created_by', 'current-user-id'); // In real app, this would be auth.uid()
        if (error) throw error;
        return data;
      }

      // If no filters, return all requests
      const { data, error } = await baseQuery;
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Sort the data after fetching since we can't chain order() in the mock client
  const sortedData = data?.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-4">
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
      {sortedData?.map((request) => (
        <div
          key={request.id}
          className="flex flex-col p-4 border rounded-lg hover:bg-accent/50 transition-colors space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">{request.title}</div>
              <div className="text-sm text-muted-foreground">
                {filterByCurrentUser ? (
                  `Created ${format(new Date(request.created_at), 'PPP')}`
                ) : (
                  <>
                    Requested by {request.creator?.name} • {request.creator?.department} • 
                    Created {format(new Date(request.created_at), 'PPP')}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={request.status} />
              {showActions && (
                <div className="flex items-center gap-2">
                  {showCreateGRN && request.status === 'APPROVED' && request.grn_status === 'PENDING' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/grn/create?requestId=${request.id}`)}
                    >
                      <PackageCheck className="h-4 w-4 mr-2" />
                      Create GRN
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/requests/${request.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Approval Progress Section */}
          {request.status !== 'DRAFT' && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Approval Progress</div>
                <div className="text-sm text-muted-foreground">
                  Step {request.current_approval_step} of {request.total_approval_steps}
                </div>
              </div>
              <div className="space-y-2">
                <Progress 
                  value={(request.current_approval_step / request.total_approval_steps) * 100} 
                  className="h-2"
                />
                <div className="text-sm text-muted-foreground">
                  {request.workflow_status}
                  {request.approver_role && ` • Current approver: ${request.approver_role}`}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {sortedData?.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No requests found
        </div>
      )}
    </div>
  );
}
