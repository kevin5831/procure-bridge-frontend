
import { FileTextIcon } from "lucide-react";
import { NavGroup } from "../NavGroup";
import { NavItem } from "../NavItem";

interface PurchaseOrderSectionProps {
  currentPath: string;
}

export function PurchaseOrderSection({ currentPath }: PurchaseOrderSectionProps) {
  const isPORoute = currentPath.startsWith('/purchase-orders');
  
  return (
    <NavGroup 
      title="Purchase Orders" 
      icon={FileTextIcon}
      defaultOpen={isPORoute}
    >
      <NavItem 
        href="/purchase-orders" 
        isActive={currentPath === "/purchase-orders"}
        depth={1}
      >
        All Purchase Orders
      </NavItem>
      <NavItem 
        href="/purchase-orders/create" 
        isActive={currentPath === "/purchase-orders/create"}
        depth={1}
      >
        Create PO
      </NavItem>
      {/* Add dynamic route support for active state on PO details */}
      {currentPath.startsWith("/purchase-orders/") && 
       currentPath !== "/purchase-orders/create" && (
        <NavItem 
          href={currentPath} 
          isActive={true}
          depth={1}
        >
          PO Details
        </NavItem>
      )}
    </NavGroup>
  );
}
