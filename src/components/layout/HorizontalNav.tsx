
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, ClipboardCheck, Truck, Package } from "lucide-react";

export function HorizontalNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/requests" || path === "/grn") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 md:space-x-8 overflow-x-auto" aria-label="Procurement Tabs">
          <NavLink
            to="/requests"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )
            }
          >
            <FileText className="w-4 h-4" />
            Purchase Requests
          </NavLink>
          <NavLink
            to="/requests/approvals"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )
            }
          >
            <ClipboardCheck className="w-4 h-4" />
            Approvals
          </NavLink>
          <NavLink
            to="/requests/delivery"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )
            }
          >
            <Truck className="w-4 h-4" />
            Delivery Requests
          </NavLink>
          <NavLink
            to="/grn"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )
            }
          >
            <Package className="w-4 h-4" />
            Goods Receipt
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
