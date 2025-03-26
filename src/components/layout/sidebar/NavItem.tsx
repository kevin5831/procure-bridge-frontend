
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  depth?: number;
}

export function NavItem({ href, children, depth = 0 }: NavItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        depth > 0 && "pl-10",
        isActive
          ? "bg-accent text-accent-foreground shadow-sm" // Premium active state with shadow
          : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-800" // Refined inactive state
      )}
      end
    >
      {children}
    </NavLink>
  );
}
