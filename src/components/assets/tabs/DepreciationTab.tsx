
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DepreciationTabProps {
  depreciation: {
    method: string;
    usefulLife: string;
    salvageValue: number;
    monthlyDepreciation: number;
  };
}

export function DepreciationTab({ depreciation }: DepreciationTabProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Depreciation Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/finance/depreciation-schedule")}
        >
          <FileText className="h-4 w-4 mr-2" />
          View Full Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Method</p>
            <p>{depreciation.method}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Useful Life</p>
            <p>{depreciation.usefulLife}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Salvage Value</p>
            <p>${depreciation.salvageValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Depreciation</p>
            <p>${depreciation.monthlyDepreciation.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
