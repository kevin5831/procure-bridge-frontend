
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, FileText, PlayCircle, Search } from "lucide-react";
import type { MaintenanceTask } from "@/types/maintenance";
import { useState } from "react";
import { toast } from "sonner";
import { MaintenanceDetailDialog } from "./MaintenanceDetailDialog";

const mockTasks: MaintenanceTask[] = [
  {
    id: "MAINT-001",
    assetId: "AST-001",
    assetName: "HP Laptop EliteBook G8",
    scheduledDate: "2024-03-15",
    location: "IT Lab - Building A",
    cost: 150.00,
    status: "Scheduled",
    maintenanceType: "Internal",
    description: "Regular maintenance check",
    vendor: undefined
  },
  {
    id: "MAINT-002",
    assetId: "AST-002",
    assetName: "Office Printer Canon MX-500",
    scheduledDate: "2024-03-10",
    location: "2nd Floor Office",
    cost: 200.00,
    status: "In Progress",
    maintenanceType: "External",
    description: "Cartridge replacement and calibration",
    vendor: "PrintCare Services"
  },
  {
    id: "MAINT-003",
    assetId: "AST-003",
    assetName: "Meeting Room Projector",
    scheduledDate: "2024-02-28",
    location: "Conference Room 3",
    cost: 100.00,
    status: "Completed",
    maintenanceType: "External",
    description: "Lamp replacement",
    vendor: "AV Solutions Ltd",
    completedDate: "2024-02-28",
    completedBy: "John Smith"
  }
];

export function MaintenanceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusIcon = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'Scheduled':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'In Progress':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const handleComplete = (taskId: string) => {
    console.log("Completing task:", taskId);
    toast.success("Task marked as completed");
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = 
      task.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{task.assetName}</p>
                    <p className="text-sm text-muted-foreground">{task.assetId}</p>
                  </div>
                </TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>{task.scheduledDate}</TableCell>
                <TableCell>{task.maintenanceType}</TableCell>
                <TableCell>{task.vendor || 'N/A'}</TableCell>
                <TableCell>${task.cost.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <span>{task.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setIsDetailOpen(true);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    {task.status !== "Completed" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleComplete(task.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MaintenanceDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        task={selectedTask}
      />
    </div>
  );
}
