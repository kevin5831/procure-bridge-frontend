
import { Box, DollarSign, FileText, Wrench } from "lucide-react";
import { StatCard } from "./StatCard";
import { OverviewGraph } from "./OverviewGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceAlerts } from "./MaintenanceAlerts";
import { RequestList } from "./RequestList";

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value="12"
          description="3 pending approval"
          icon={FileText}
          linkText="View all requests"
          linkPath="/requests"
        />
        <StatCard
          title="Assets"
          value="142"
          description="23 require maintenance"
          icon={Box}
          linkText="View all assets"
          linkPath="/assets"
        />
        <StatCard
          title="Budget Used"
          value="68%"
          description="$340,000 remaining"
          icon={DollarSign}
          linkText="View budget"
          linkPath="/finance"
        />
        <StatCard
          title="Maintenance"
          value="8"
          description="Scheduled this month"
          icon={Wrench}
          linkText="View schedule"
          linkPath="/maintenance"
        />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="border rounded-lg">
          <CardHeader className="pb-2 border-b p-4">
            <CardTitle className="text-lg">Asset Acquisition Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <OverviewGraph />
          </CardContent>
        </Card>
        
        <MaintenanceAlerts alerts={[
          { id: '1', asset: 'Printer XC-101', dueDate: '2024-03-15', priority: 'high' },
          { id: '2', asset: 'Laptop HP-441', dueDate: '2024-03-20', priority: 'medium' },
          { id: '3', asset: 'Server R-201', dueDate: '2024-03-25', priority: 'low' }
        ]} />
      </div>
      
      <Card className="border rounded-lg">
        <CardHeader className="border-b pb-3 p-4">
          <CardTitle className="text-lg">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <RequestList showActions={false} />
        </CardContent>
      </Card>
    </div>
  );
}
