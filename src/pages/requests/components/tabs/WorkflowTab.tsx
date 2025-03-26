
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getStatusColor } from "../utils";

interface WorkflowTabProps {
  request: any; // TODO: Add proper type
}

export function WorkflowTab({ request }: WorkflowTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {request.approvalSteps.map((step: any, index: number) => (
            <div key={step.id} className="flex items-start mb-8 last:mb-0">
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2",
                  step.status === "Approved" ? "border-green-500 bg-green-50" :
                  step.status === "Pending" ? "border-yellow-500 bg-yellow-50" :
                  "border-gray-300 bg-gray-50"
                )}>
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                {index < request.approvalSteps.length - 1 && (
                  <div className="absolute top-10 left-5 w-0.5 h-16 -translate-x-1/2 bg-gray-200" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.approver} • {step.role}</p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(step.status)}>
                    {step.status}
                  </Badge>
                </div>
                {step.date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Completed on {step.date}
                  </p>
                )}
                {step.notes && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "{step.notes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
