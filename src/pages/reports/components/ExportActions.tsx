
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet, Printer } from "lucide-react";

interface ExportActionsProps {
  onGenerate: () => void;
  onExport: (format: "pdf" | "excel" | "csv") => void;
  isGenerating: boolean;
}

export function ExportActions({ onGenerate, onExport, isGenerating }: ExportActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <Button 
        onClick={onGenerate}
        className="gap-2"
        disabled={isGenerating}
      >
        <FileText className="h-4 w-4" />
        {isGenerating ? "Generating..." : "Generate Report"}
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onExport("pdf")}
          className="gap-2"
          disabled={isGenerating}
        >
          <Download className="h-4 w-4" />
          PDF
        </Button>
        <Button
          variant="outline"
          onClick={() => onExport("excel")}
          className="gap-2"
          disabled={isGenerating}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Excel
        </Button>
        <Button
          variant="outline"
          onClick={() => onExport("csv")}
          className="gap-2"
          disabled={isGenerating}
        >
          <Download className="h-4 w-4" />
          CSV
        </Button>
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="gap-2"
          disabled={isGenerating}
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  );
}
