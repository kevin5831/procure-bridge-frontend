
import { CreateRequestForm } from "./CreateRequestForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AssetCategory } from "../types";
import { CreateAssetRequestForm } from "./CreateAssetRequestForm";
import { useLocation } from "react-router-dom";

interface CreateRequestSidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetCategory?: AssetCategory;
}

export function CreateRequestSidePanel({ 
  open, 
  onOpenChange, 
  assetCategory 
}: CreateRequestSidePanelProps) {
  const location = useLocation();
  const isAssetRequest = location.pathname === "/assets/request";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-y-auto"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">
            {isAssetRequest ? "Create Asset Request" : "Create New Request"}
          </SheetTitle>
        </SheetHeader>
        
        {isAssetRequest ? (
          <CreateAssetRequestForm onComplete={() => onOpenChange(false)} assetCategory={assetCategory} />
        ) : (
          <CreateRequestForm onComplete={() => onOpenChange(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
}
