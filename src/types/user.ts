export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  department?: string;
  departmentId?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'assets' | 'procurement' | 'finance' | 'maintenance' | 'reports' | 'admin';
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

// Pre-defined permissions mapping
export const defaultPermissions: { [key: string]: Permission[] } = {
  'Admin': [
    {
      id: 'perm_assets_all',
      name: 'Manage Assets',
      description: 'Full control over assets',
      module: 'assets',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      id: 'perm_procurement_all',
      name: 'Manage Procurement',
      description: 'Full control over procurement',
      module: 'procurement',
      actions: ['create', 'read', 'update', 'delete', 'approve']
    },
    {
      id: 'perm_finance_all',
      name: 'Manage Finance',
      description: 'Full control over financial data',
      module: 'finance',
      actions: ['create', 'read', 'update', 'delete', 'approve']
    },
    {
      id: 'perm_maintenance_all',
      name: 'Manage Maintenance',
      description: 'Full control over maintenance',
      module: 'maintenance',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      id: 'perm_reports_all',
      name: 'Access Reports',
      description: 'Full access to all reports',
      module: 'reports',
      actions: ['read']
    },
    {
      id: 'perm_admin_all',
      name: 'Administration',
      description: 'Full administrative access',
      module: 'admin',
      actions: ['create', 'read', 'update', 'delete']
    }
  ],
  'Finance': [
    {
      id: 'perm_assets_view',
      name: 'View Assets',
      description: 'View asset details',
      module: 'assets',
      actions: ['read']
    },
    {
      id: 'perm_finance_manage',
      name: 'Manage Finance',
      description: 'Manage financial records',
      module: 'finance',
      actions: ['create', 'read', 'update', 'approve']
    },
    {
      id: 'perm_procurement_approve',
      name: 'Approve Procurement',
      description: 'Approve procurement requests',
      module: 'procurement',
      actions: ['read', 'approve']
    },
    {
      id: 'perm_reports_finance',
      name: 'Finance Reports',
      description: 'Access financial reports',
      module: 'reports',
      actions: ['read']
    }
  ],
  'IT Manager': [
    {
      id: 'perm_assets_manage',
      name: 'Manage IT Assets',
      description: 'Manage IT assets',
      module: 'assets',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      id: 'perm_procurement_manage',
      name: 'Manage IT Procurement',
      description: 'Manage IT procurement',
      module: 'procurement',
      actions: ['create', 'read', 'update']
    },
    {
      id: 'perm_maintenance_manage',
      name: 'Manage Maintenance',
      description: 'Manage maintenance tasks',
      module: 'maintenance',
      actions: ['create', 'read', 'update', 'delete']
    }
  ],
  'Procurement': [
    {
      id: 'perm_procurement_manage',
      name: 'Manage Procurement',
      description: 'Manage procurement requests',
      module: 'procurement',
      actions: ['create', 'read', 'update', 'approve']
    },
    {
      id: 'perm_assets_view',
      name: 'View Assets',
      description: 'View asset details',
      module: 'assets',
      actions: ['read']
    }
  ],
  'Employee': [
    {
      id: 'perm_assets_view',
      name: 'View Assets',
      description: 'View assigned assets',
      module: 'assets',
      actions: ['read']
    },
    {
      id: 'perm_procurement_request',
      name: 'Create Requests',
      description: 'Create procurement requests',
      module: 'procurement',
      actions: ['create', 'read']
    }
  ]
};

// Helper functions for permission checking
export function hasPermission(
  userRole: string,
  module: Permission['module'],
  action: Permission['actions'][number]
): boolean {
  const rolePermissions = defaultPermissions[userRole] || [];
  return rolePermissions.some(permission => 
    permission.module === module && 
    permission.actions.includes(action)
  );
}

export function getModulePermissions(
  userRole: string,
  module: Permission['module']
): Permission['actions'] {
  const rolePermissions = defaultPermissions[userRole] || [];
  const modulePermission = rolePermissions.find(p => p.module === module);
  return modulePermission?.actions || [];
}

export function canAccessModule(
  userRole: string,
  module: Permission['module']
): boolean {
  const rolePermissions = defaultPermissions[userRole] || [];
  return rolePermissions.some(permission => permission.module === module);
}
