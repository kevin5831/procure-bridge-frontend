
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { Role } from "@/types/user";

interface EditRolePermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

const availablePermissions = [
  {
    module: "assets",
    permissions: [
      { id: "assets.create", name: "Create Assets", actions: ["create"] },
      { id: "assets.view", name: "View Assets", actions: ["read"] },
      { id: "assets.edit", name: "Edit Assets", actions: ["update"] },
      { id: "assets.delete", name: "Delete Assets", actions: ["delete"] },
    ],
  },
  {
    module: "procurement",
    permissions: [
      { id: "procurement.create", name: "Create Requests", actions: ["create"] },
      { id: "procurement.approve", name: "Approve Requests", actions: ["approve"] },
      { id: "procurement.view", name: "View Requests", actions: ["read"] },
    ],
  },
  {
    module: "finance",
    permissions: [
      { id: "finance.view", name: "View Financial Data", actions: ["read"] },
      { id: "finance.edit", name: "Edit Financial Records", actions: ["update"] },
      { id: "finance.approve", name: "Approve Transactions", actions: ["approve"] },
    ],
  },
];

export function EditRolePermissionsDialog({ 
  open, 
  onOpenChange, 
  role 
}: EditRolePermissionsDialogProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role.permissions.map((p) => p.id)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // API call would go here
      console.log("Updating permissions for role:", role.id, selectedPermissions);
      toast.success("Role permissions updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update role permissions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Role Permissions - {role.name}</DialogTitle>
          <DialogDescription>
            Configure the permissions for this role. Users assigned this role will inherit these permissions.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {availablePermissions.map((module) => (
              <div key={module.module} className="space-y-4">
                <h3 className="font-semibold capitalize">{module.module}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {module.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                      />
                      <label
                        htmlFor={permission.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
