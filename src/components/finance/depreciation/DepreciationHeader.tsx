
import { Button } from "@/components/ui/button";
import { FileText, ArrowUpDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DepreciationHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Depreciation Setup</h1>
          <p className="text-muted-foreground mt-1">
            Configure depreciation methods and policies for asset categories
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/finance/depreciation-schedule")}
        >
          <FileText className="h-4 w-4 mr-2" />
          View Schedule
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/finance/impairment-revaluation")}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Revaluation
        </Button>
      </div>
    </div>
  );
}
