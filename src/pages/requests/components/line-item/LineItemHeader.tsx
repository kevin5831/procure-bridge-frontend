
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LineItemHeaderProps {
  onRemove: () => void;
  isRemovable: boolean;
}

export function LineItemHeader({ onRemove, isRemovable }: LineItemHeaderProps) {
  return (
    <div className="absolute top-3 right-3">
      {isRemovable && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onRemove}
          className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Remove Item</span>
        </Button>
      )}
    </div>
  );
}
