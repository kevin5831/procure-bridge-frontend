
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/finance/depreciation-setup", label: "Depreciation Setup" },
  { href: "/admin/finance/depreciation-schedule", label: "Depreciation Schedule" },
  { href: "/admin/finance/impairment-revaluation", label: "Impairment & Revaluation" },
  { href: "/admin/finance/erp-integration", label: "ERP Integration" },
];

export function DepreciationNav() {
  const location = useLocation();
  
  return (
    <div className="border-b mb-6">
      <nav className="flex space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "py-4 px-1 border-b-2 text-sm font-medium transition-colors hover:border-gray-300 hover:text-gray-700",
              location.pathname === item.href
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
