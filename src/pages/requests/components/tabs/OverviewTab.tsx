
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PackageCheck } from "lucide-react";

interface Request {
  id: string;
  title: string;
  requester: string;
  department: string;
  date: string;
  totalCost: number;
  status: string;
  items: Array<{
    id: number;
    description: string;
    quantity: number;
    unitCost: number;
  }>;
  currency: string;
}

interface OverviewTabProps {
  request: Request;
}

export function OverviewTab({ request }: OverviewTabProps) {
  const navigate = useNavigate();

  const handleCreateGRN = () => {
    navigate(`/grn/create?requestId=${request.id}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Title</dt>
              <dd className="text-base">{request.title}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Requester</dt>
              <dd className="text-base">{request.requester}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Department</dt>
              <dd className="text-base">{request.department}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Date</dt>
              <dd className="text-base">{request.date}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Total Cost</dt>
              <dd className="text-base">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: request.currency
                }).format(request.totalCost)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd className="text-base">{request.status}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {request.items.map((item) => (
              <li key={item.id} className="space-y-1">
                <div className="text-sm">{item.description}</div>
                <div className="text-sm text-muted-foreground">
                  {item.quantity} × {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: request.currency
                  }).format(item.unitCost)}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {request.status === 'APPROVED' && (
        <div className="col-span-full">
          <Button 
            onClick={handleCreateGRN}
            className="w-full sm:w-auto"
          >
            <PackageCheck className="h-4 w-4 mr-2" />
            Create Goods Receipt Note
          </Button>
        </div>
      )}
    </div>
  );
}
