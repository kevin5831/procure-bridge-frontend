
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, FileText, Banknote, Link } from "lucide-react";

const financeMenuItems = [
  {
    title: "Depreciation Setup",
    path: "/admin/finance/depreciation-setup",
    icon: Settings,
  },
  {
    title: "Depreciation Schedule",
    path: "/admin/finance/depreciation-schedule",
    icon: FileText,
  },
  {
    title: "Impairment & Revaluation",
    path: "/admin/finance/impairment-revaluation",
    icon: Banknote,
  },
  {
    title: "ERP Integration",
    path: "/admin/finance/erp-integration",
    icon: Link,
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed left-0 right-0 top-16 h-12 bg-background border-b z-30">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500">Finance:</span>
        <div className="flex items-center space-x-2">
          {financeMenuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-gray-600 hover:bg-accent/10"
              }`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
