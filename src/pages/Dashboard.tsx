
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CompletionRate } from "@/components/dashboard/CompletionRate";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7days");
  const [compareWith, setCompareWith] = useState("previous");
  const [frequency, setFrequency] = useState("daily");

  const handleAddRequest = () => {
    navigate("/requests", { state: { openCreateDialog: true } });
  };

  const handleExport = () => {
    toast.success("Dashboard data exported successfully");
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="border-b bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Asset Management Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Monitor and manage your organization's assets
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="rounded-full shadow-sm" 
                size="sm"
                onClick={handleAddRequest}
              >
                New Request
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full shadow-sm" 
                size="sm"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <DashboardHeader
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            compareWith={compareWith}
            setCompareWith={setCompareWith}
            frequency={frequency}
            setFrequency={setFrequency}
            onAddRequest={handleAddRequest}
            onExport={handleExport}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CompletionRate 
          title="Active Requests Value" 
          value="$45,231.89" 
          subtext="$3,241.89 previous period" 
          percentage={12} 
          trend="up"
          link="/requests"
        />
        <CompletionRate 
          title="Approval Efficiency" 
          value="2.4 days" 
          subtext="3.1 days average response time" 
          percentage={22} 
          trend="down"
          link="/requests/approvals"
        />
        <CompletionRate 
          title="Pending Actions" 
          value="24" 
          subtext="18 requests need your attention" 
          percentage={33} 
          trend="up"
          link="/requests/pending"
        />
        <CompletionRate 
          title="Budget Utilization" 
          value="67%" 
          subtext="of Q1 procurement budget used" 
          percentage={5} 
          trend="up"
          link="/finance"
        />
      </div>

      <AnalyticsSection />
    </div>
  );
}
