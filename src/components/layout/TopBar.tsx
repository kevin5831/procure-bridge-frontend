
import { Menu, Bell, Settings, User, Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface TopBarProps {
  onMenuClick: () => void;
  scrolled: boolean;
  onCreateRequest?: () => void;
}

export function TopBar({ onMenuClick, scrolled, onCreateRequest }: TopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAssetsPage = location.pathname.startsWith('/assets');
  
  const handleCreateAsset = () => {
    navigate('/assets/create-from-po');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-all duration-200",
      scrolled 
        ? "bg-white/95 shadow-sm" 
        : "bg-background/95 supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden hover:bg-primary/10" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex items-center">
          <span className="ml-2 text-lg font-semibold">Asseter</span>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          {onCreateRequest && (
            <Button 
              onClick={onCreateRequest}
              className="hidden md:flex items-center gap-2 rounded-full shadow-sm"
              variant="default"
            >
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          )}
          
          {isAssetsPage && (
            <Button 
              onClick={handleCreateAsset}
              className="hidden md:flex items-center gap-2 rounded-full shadow-sm"
              variant="default"
            >
              <Package className="h-4 w-4" />
              Create Asset
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10 rounded-full"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-primary/10 rounded-full"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-primary/10 rounded-full"
          >
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
