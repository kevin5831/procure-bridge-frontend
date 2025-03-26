
import { Badge } from "@/components/ui/badge";
import { RequestStatus, requestStatuses } from "./types";

interface StatusBadgeProps {
  status: RequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={requestStatuses[status].color}
    >
      {requestStatuses[status].label}
    </Badge>
  );
}
