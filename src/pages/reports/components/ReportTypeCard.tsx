
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ReportTypeCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function ReportTypeCard({
  id,
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
}: ReportTypeCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
        isSelected ? "border-primary" : ""
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Icon className={cn("h-8 w-8", isSelected ? "text-primary" : "")} />
          <div className="flex-1">
            <CardTitle className={cn("text-lg", isSelected ? "text-primary" : "")}>{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
