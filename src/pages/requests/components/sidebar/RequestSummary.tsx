
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequestSummaryProps {
  request: any; // TODO: Add proper type
}

export function RequestSummary({ request }: RequestSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Current Step</p>
          <p>{request.approvalSteps.find((step: any) => step.status === "Pending")?.title || "Completed"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold">${request.totalCost.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Items</p>
          <p>{request.items.length} items</p>
        </div>
      </CardContent>
    </Card>
  );
}
