
import { 
  BarChart3, 
  CalendarDays, 
  FileSpreadsheet, 
  FileText, 
  LayoutDashboard, 
  TrendingUp 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  requiresDateRange?: boolean;
  requiresCategory?: boolean;
  requiresLocation?: boolean;
}

export const reportTypes: ReportType[] = [
  {
    id: "asset-register",
    title: "Fixed Asset Register",
    description: "Complete list of all assets with their current status",
    icon: FileText,
    requiresDateRange: false,
    requiresCategory: true,
    requiresLocation: true
  },
  {
    id: "depreciation",
    title: "Depreciation Report",
    description: "Monthly and annual depreciation calculations",
    icon: TrendingUp,
    requiresDateRange: true,
    requiresCategory: true,
    requiresLocation: false
  },
  {
    id: "maintenance",
    title: "Maintenance History",
    description: "Service records and maintenance costs",
    icon: CalendarDays,
    requiresDateRange: true,
    requiresCategory: false,
    requiresLocation: true
  },
  {
    id: "procurement",
    title: "Procurement Analysis",
    description: "Purchase orders and vendor statistics",
    icon: BarChart3,
    requiresDateRange: true,
    requiresCategory: false,
    requiresLocation: false
  },
  {
    id: "utilization",
    title: "Asset Utilization",
    description: "Usage metrics and efficiency reports",
    icon: LayoutDashboard,
    requiresDateRange: true,
    requiresCategory: true,
    requiresLocation: true
  },
  {
    id: "export",
    title: "Data Export",
    description: "Export data in various formats",
    icon: FileSpreadsheet,
    requiresDateRange: false,
    requiresCategory: false,
    requiresLocation: false
  }
];
