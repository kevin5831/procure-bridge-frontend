
import { hasPermission, canAccessModule, getModulePermissions } from "@/types/user";
import type { Permission } from "@/types/user";

// Mock current user - replace with actual auth system
const currentUser = {
  role: "Admin" // This should come from your auth system
};

export function usePermissions() {
  const can = (module: Permission['module'], action: Permission['actions'][number]): boolean => {
    return hasPermission(currentUser.role, module, action);
  };

  const canAccess = (module: Permission['module']): boolean => {
    return canAccessModule(currentUser.role, module);
  };

  const getPermissions = (module: Permission['module']): Permission['actions'] => {
    return getModulePermissions(currentUser.role, module);
  };

  return {
    can,
    canAccess,
    getPermissions,
    role: currentUser.role
  };
}
