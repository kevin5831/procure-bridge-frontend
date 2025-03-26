
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Settings2 } from "lucide-react";
import { toast } from "sonner";
import type { Role } from "@/types/user";
import { CreateRoleDialog } from "@/components/admin/roles/CreateRoleDialog";
import { EditRolePermissionsDialog } from "@/components/admin/roles/EditRolePermissionsDialog";

// Mock data - replace with actual API call
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    permissions: [
      {
        id: "1",
        name: "Manage Users",
        description: "Can manage user accounts",
        module: "admin",
        actions: ["create", "read", "update", "delete"],
      },
    ],
  },
  {
    id: "2",
    name: "Finance Manager",
    description: "Access to financial records and reports",
    permissions: [
      {
        id: "2",
        name: "View Reports",
        description: "Can view financial reports",
        module: "finance",
        actions: ["read"],
      },
    ],
  },
];

export default function Roles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = mockRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditDialogOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage system roles and their permissions</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions Count</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.permissions.length}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditRole(role)}
                  >
                    <Settings2 className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateRoleDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      {selectedRole && (
        <EditRolePermissionsDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          role={selectedRole}
        />
      )}
    </main>
  );
}
