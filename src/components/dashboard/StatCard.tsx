
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  linkText: string;
  linkPath: string;
}

export function StatCard({ title, value, description, icon: Icon, linkText, linkPath }: StatCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="border rounded-lg bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        
        <div className="mt-4 flex items-center text-sm text-primary font-medium cursor-pointer group" onClick={() => navigate(linkPath)}>
          {linkText} 
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
