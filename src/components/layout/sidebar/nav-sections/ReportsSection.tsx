
import { FileText } from "lucide-react";
import { NavGroup } from "../NavGroup";
import { NavItem } from "../NavItem";

interface ReportsSectionProps {
  currentPath: string;
}

export function ReportsSection({ currentPath }: ReportsSectionProps) {
  return (
    <NavGroup 
      title="Reports" 
      icon={FileText}
      defaultOpen={currentPath.startsWith("/reports")}
    >
      <NavItem 
        href="/reports" 
        depth={1}
      >
        Standard Reports
      </NavItem>
      <NavItem 
        href="/reports/custom" 
        depth={1}
      >
        Custom Reports
      </NavItem>
    </NavGroup>
  );
}
