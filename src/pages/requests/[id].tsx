
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/tabs/OverviewTab";
import { DetailsTab } from "./components/tabs/DetailsTab";
import { DocumentsTab } from "./components/tabs/DocumentsTab";
import { WorkflowTab } from "./components/tabs/WorkflowTab";

export default function RequestDetail() {
  const { id } = useParams();

  // Mock request data for development
  const mockRequest = {
    id: id,
    title: "Sample Request",
    requester: "John Doe",
    department: "IT",
    date: "2024-02-20",
    totalCost: 1500,
    status: "Pending",
    items: [
      {
        id: 1,
        description: "Laptop",
        quantity: 1,
        unitCost: 1500,
      }
    ],
    justification: "Required for new employee",
    approvalSteps: [
      {
        id: 1,
        title: "Department Manager Approval",
        approver: "Jane Smith",
        role: "Manager",
        status: "Pending",
        date: null,
      }
    ],
    currency: "USD",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Request {id}</h1>
          <p className="text-sm text-muted-foreground">View and manage request details</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Edit</Button>
          <Button>Approve</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab request={mockRequest} />
        </TabsContent>
        <TabsContent value="details">
          <DetailsTab request={mockRequest} />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
        <TabsContent value="workflow">
          <WorkflowTab request={mockRequest} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
