import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { format } from "date-fns";
import { CheckCircle, Clock, PlayCircle, Building2, Truck } from "lucide-react";
import type { MaintenanceTask } from "@/types/maintenance";

interface MaintenanceTabProps {
  maintenanceHistory: MaintenanceTask[];
}

export function MaintenanceTab({ maintenanceHistory }: MaintenanceTabProps) {
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

  const internalTasks = maintenanceHistory.filter(task => 
    task.vendor === 'Internal IT' || task.vendor === 'Internal Facilities'
  );
  const externalTasks = maintenanceHistory.filter(task => 
    task.vendor !== 'Internal IT' && task.vendor !== 'Internal Facilities'
  );

  const MaintenanceTable = ({ tasks }: { tasks: MaintenanceTask[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks
          .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
          .map((task) => (
            <TableRow key={task.id}>
              <TableCell>{format(new Date(task.scheduledDate), 'PP')}</TableCell>
              <TableCell>{task.location}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>${task.cost.toFixed(2)}</TableCell>
              <TableCell>{task.vendor || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <span>{task.status}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="internal" className="w-full">
        <TabsList>
          <TabsTrigger value="internal">
            <Building2 className="h-4 w-4 mr-2" />
            Internal Maintenance
          </TabsTrigger>
          <TabsTrigger value="external">
            <Truck className="h-4 w-4 mr-2" />
            External Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          <Card>
            <CardHeader>
              <CardTitle>Internal Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              {internalTasks.length > 0 ? (
                <MaintenanceTable tasks={internalTasks} />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No internal maintenance history available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card>
            <CardHeader>
              <CardTitle>External Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              {externalTasks.length > 0 ? (
                <MaintenanceTable tasks={externalTasks} />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No external maintenance history available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
