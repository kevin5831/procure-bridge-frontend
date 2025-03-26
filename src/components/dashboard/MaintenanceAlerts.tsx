
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MaintenanceAlert {
  id: string;
  asset: string;
  dueDate: string;
  priority: string;
}

export function MaintenanceAlerts({ alerts }: { alerts: MaintenanceAlert[] }) {
  const navigate = useNavigate();
  
  return (
    <Card className="border rounded-lg">
      <CardHeader className="border-b pb-3 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Maintenance Alerts
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary" 
            onClick={() => navigate("/maintenance")}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>{alert.asset}</TableCell>
                <TableCell>{alert.dueDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alert.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : alert.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.priority}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
