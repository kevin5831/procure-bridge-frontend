
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ReportHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Reports</h1>
          <p className="text-muted-foreground">
            Generate and export asset management reports
          </p>
        </div>
      </div>
    </div>
  );
}
