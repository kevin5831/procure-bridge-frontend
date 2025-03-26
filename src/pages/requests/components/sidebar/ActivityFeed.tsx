
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  request: any; // TODO: Add proper type
}

export function ActivityFeed({ request }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {request.approvalSteps
            .filter((step: any) => step.date)
            .map((step: any) => (
              <div key={step.id} className="flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  step.status === "Approved" ? "bg-green-500" : "bg-gray-300"
                )} />
                <div>
                  <p className="text-sm">{step.title} - {step.approver}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
