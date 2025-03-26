
import { Button } from "@/components/ui/button";
import { Eye, Edit2, X, Send, Check } from "lucide-react";
import { RequestStatus } from "./types";

interface RequestActionsProps {
  id: string;
  status: RequestStatus;
  canApprove: boolean;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  onStatusChange: (id: string, status: RequestStatus) => void;
}

export function RequestActions({
  id,
  status,
  canApprove,
  onView,
  onEdit,
  onCancel,
  onStatusChange,
}: RequestActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onView(id);
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      {status === 'DRAFT' && onEdit && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(id, 'PENDING');
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </>
      )}

      {status === 'PENDING' && canApprove && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(id, 'APPROVED');
            }}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(id, 'REJECTED');
            }}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </>
      )}

      {['DRAFT', 'PENDING'].includes(status) && onCancel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onCancel(id);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
