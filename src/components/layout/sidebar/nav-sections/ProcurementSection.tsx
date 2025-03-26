
import { FileTextIcon } from "lucide-react";
import { NavGroup } from "../NavGroup";
import { NavItem } from "../NavItem";

interface ProcurementSectionProps {
  currentPath: string;
}

export function ProcurementSection({ currentPath }: ProcurementSectionProps) {
  const isProcurementRoute = currentPath.startsWith('/requests') || currentPath.startsWith('/purchase-orders');
  
  return (
    <NavGroup 
      title="Procurement" 
      icon={FileTextIcon}
      defaultOpen={isProcurementRoute}
    >
      <NavItem 
        href="/requests" 
        depth={1}
      >
        Requests
      </NavItem>
      <NavItem 
        href="/purchase-orders" 
        depth={1}
      >
        Purchase Orders
      </NavItem>
    </NavGroup>
  );
}
