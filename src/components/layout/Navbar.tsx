
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BellIcon, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ email: string; company: string } | null>(null);

  const isAuthPage = location.pathname === "/login";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className={cn("fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLogoClick}
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Asseter
            </button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Procurement</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/requests/new")}
                      >
                        Create Request
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/requests")}
                      >
                        My Requests
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/approvals")}
                      >
                        Approvals
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Assets</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/assets")}
                      >
                        Asset List
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/maintenance")}
                      >
                        Maintenance
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/finance/depreciation-setup")}
                      >
                        Depreciation Setup
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/finance/depreciation-schedule")}
                      >
                        Depreciation Schedules
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/finance/impairment-revaluation")}
                      >
                        Revaluation/Impairment
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/reports")}
                      >
                        Standard Reports
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/reports/custom")}
                      >
                        Custom Reports
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] gap-1 p-2">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/users")}
                      >
                        User Management
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/roles")}
                      >
                        Roles & Permissions
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/integrations")}
                      >
                        Integrations
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/company")}
                      >
                        Company Setup
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => navigate("/admin/audit-logs")}
                      >
                        Audit Logs
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="hidden md:inline">{user.company}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="hidden md:inline-flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => navigate("/register")}
                    className="hidden md:inline-flex"
                  >
                    Get Started
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
