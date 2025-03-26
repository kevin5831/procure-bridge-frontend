
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MaintenanceList } from "@/components/maintenance/MaintenanceList";
import { CreateMaintenanceDialog } from "@/components/maintenance/CreateMaintenanceDialog";
import { usePermissions } from "@/hooks/usePermissions";
import { HorizontalAssetsTabs } from "@/components/assets/HorizontalAssetsTabs";

export default function Maintenance() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { can } = usePermissions();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Maintenance Tasks</h1>
          <p className="text-muted-foreground">Track and manage asset maintenance schedules</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="inline-flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Maintenance Task
        </Button>
      </div>

      <HorizontalAssetsTabs tabSet="maintenance" />

      <div className="space-y-4">
        <MaintenanceList />
      </div>
      
      <CreateMaintenanceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </main>
  );
}
