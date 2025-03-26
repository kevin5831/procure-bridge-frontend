
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ReportTypeCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ReportTypeCard({ title, description, icon: Icon }: ReportTypeCardProps) {
  return (
    <Card className="hover:bg-accent cursor-pointer transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
