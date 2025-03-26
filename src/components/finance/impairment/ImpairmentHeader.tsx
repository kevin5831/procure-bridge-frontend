
import { Button } from "@/components/ui/button";
import { FileText, Download, HelpCircle } from "lucide-react";

export function ImpairmentHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Asset Category Revaluation</h1>
        <p className="text-muted-foreground mt-1">
          Record revaluations or impairments for entire asset categories in compliance with IFRS standards
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden md:inline">IFRS Guidelines</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Revaluation History</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden md:inline">Export Valuations</span>
        </Button>
      </div>
    </div>
  );
}
