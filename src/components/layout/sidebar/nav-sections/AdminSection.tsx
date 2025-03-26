
import { Settings, Users2, ShieldCheck, Building2, Link2, Building, History, GitBranch, Tag } from "lucide-react";
import { NavGroup } from "../NavGroup";
import { NavItem } from "../NavItem";

interface AdminSectionProps {
  currentPath: string;
}

export function AdminSection({ currentPath }: AdminSectionProps) {
  return (
    <NavGroup 
      title="Admin" 
      icon={Settings}
      defaultOpen={currentPath.startsWith("/admin")}
    >
      <NavItem 
        href="/admin/users" 
        isActive={currentPath === "/admin/users"}
      >
        <Users2 className="h-4 w-4 mr-2" />
        User Management
      </NavItem>
      <NavItem 
        href="/admin/roles" 
        isActive={currentPath === "/admin/roles"}
      >
        <ShieldCheck className="h-4 w-4 mr-2" />
        Roles & Permissions
      </NavItem>
      <NavItem 
        href="/admin/workflow" 
        isActive={currentPath === "/admin/workflow"}
      >
        <GitBranch className="h-4 w-4 mr-2" />
        Approval Workflow
      </NavItem>
      <NavItem 
        href="/admin/departments" 
        isActive={currentPath === "/admin/departments"}
      >
        <Building2 className="h-4 w-4 mr-2" />
        Departments
      </NavItem>
      <NavItem 
        href="/admin/item-master" 
        isActive={currentPath === "/admin/item-master"}
      >
        <Tag className="h-4 w-4 mr-2" />
        Item Master
      </NavItem>
      <NavItem 
        href="/admin/integrations" 
        isActive={currentPath === "/admin/integrations"}
      >
        <Link2 className="h-4 w-4 mr-2" />
        Integrations
      </NavItem>
      <NavItem 
        href="/admin/company" 
        isActive={currentPath === "/admin/company"}
      >
        <Building className="h-4 w-4 mr-2" />
        Company Setup
      </NavItem>
      <NavItem 
        href="/admin/audit-logs" 
        isActive={currentPath === "/admin/audit-logs"}
      >
        <History className="h-4 w-4 mr-2" />
        Audit Logs
      </NavItem>
    </NavGroup>
  );
}
