
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LucideIcon } from "lucide-react";

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: LucideIcon;
}

export function NavGroup({ title, children, defaultOpen, icon: Icon }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 py-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
