
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Box, Wrench, Trash2, DollarSign, Store, FileText } from "lucide-react";

interface Tab {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface HorizontalAssetsTabsProps {
  tabSet?: "full" | "maintenance" | "vendors";
}

export function HorizontalAssetsTabs({ tabSet = "full" }: HorizontalAssetsTabsProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define different tab sets with icons
  const fullTabs: Tab[] = [
    { name: "Asset List", path: "/assets", icon: <Box className="h-4 w-4 mr-2" /> },
    { name: "Create from PO", path: "/assets/create-from-po", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Maintenance", path: "/maintenance", icon: <Wrench className="h-4 w-4 mr-2" /> },
    { name: "Disposal", path: "/assets/disposal", icon: <Trash2 className="h-4 w-4 mr-2" /> },
    { name: "Capitalisation", path: "/assets/capitalisation", icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { name: "Vendors", path: "/vendors", icon: <Store className="h-4 w-4 mr-2" /> }
  ];
  
  const maintenanceTabs: Tab[] = [
    { name: "Asset List", path: "/assets", icon: <Box className="h-4 w-4 mr-2" /> },
    { name: "Maintenance", path: "/maintenance", icon: <Wrench className="h-4 w-4 mr-2" /> },
    { name: "Disposal", path: "/assets/disposal", icon: <Trash2 className="h-4 w-4 mr-2" /> },
    { name: "Capitalisation", path: "/assets/capitalisation", icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { name: "Vendors", path: "/vendors", icon: <Store className="h-4 w-4 mr-2" /> }
  ];
  
  const vendorTabs: Tab[] = [
    { name: "Asset List", path: "/assets", icon: <Box className="h-4 w-4 mr-2" /> },
    { name: "Maintenance", path: "/maintenance", icon: <Wrench className="h-4 w-4 mr-2" /> },
    { name: "Vendors", path: "/vendors", icon: <Store className="h-4 w-4 mr-2" /> }
  ];
  
  // Select the appropriate tabs
  const tabs = tabSet === "maintenance" 
    ? maintenanceTabs 
    : tabSet === "vendors" 
      ? vendorTabs
      : fullTabs;

  return (
    <div className="border-b mb-6 bg-white rounded-t-lg shadow-sm">
      <nav className="flex space-x-8 px-4 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          // Check if current path matches this tab's path
          const isActive = currentPath === tab.path || 
                          (tab.path === "/assets" && currentPath === "/assets") ||
                          (tab.path === "/maintenance" && currentPath === "/maintenance") ||
                          (tab.path === "/vendors" && currentPath === "/vendors") ||
                          (tab.path === "/assets/create-from-po" && currentPath === "/assets/create-from-po") ||
                          (tab.path === "/assets/disposal" && currentPath.includes("disposal")) ||
                          (tab.path === "/assets/capitalisation" && currentPath.includes("capitalisation"));
          
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={cn(
                "py-4 px-3 border-b-2 text-sm font-medium transition-colors relative flex items-center whitespace-nowrap",
                isActive
                  ? "border-primary text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : "border-transparent text-muted-foreground hover:text-gray-800 hover:border-gray-300"
              )}
            >
              {tab.icon}
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
