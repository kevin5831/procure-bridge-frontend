import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, X, LogOut } from "lucide-react";
import { NavItem } from "./sidebar/NavItem";
import { SidebarLogo } from "./sidebar/SidebarLogo";
import { AdminSection } from "./sidebar/nav-sections/AdminSection";
import { FinanceSection } from "./sidebar/nav-sections/FinanceSection";
import { ProcurementSection } from "./sidebar/nav-sections/ProcurementSection";
import { AssetsSection } from "./sidebar/nav-sections/AssetsSection";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportsSection } from "./sidebar/nav-sections/ReportsSection";
import { authService } from "@/services/auth";

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
}

interface SidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, onOpenChange }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await authService.getUserDetails();
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0">
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between ">
            <SidebarLogo />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(!isOpen)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4">
            <nav className="space-y-1.5">
              <NavItem
                href="/dashboard"
                isActive={location.pathname === "/dashboard"}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Dashboard
              </NavItem>

              <ProcurementSection currentPath={location.pathname} />
              <AssetsSection currentPath={location.pathname} />
              <FinanceSection currentPath={location.pathname} />
              <ReportsSection currentPath={location.pathname} />
              <AdminSection currentPath={location.pathname} />
            </nav>
          </ScrollArea>

          <div className="mt-auto p-4 border-t bg-white/90 backdrop-blur-sm">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 px-2 py-1.5 h-auto hover:bg-gray-100/80"
              onClick={() => navigate("/profile")}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10" />

              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm text-muted-foreground font-medium truncate">
                  {userDetails
                    ? `${userDetails.first_name} ${userDetails.last_name}`
                    : "Loading..."}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userDetails?.email || "Loading..."}
                </p>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
