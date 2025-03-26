
import { ExportActions } from "./ExportActions";

interface ReportActionsProps {
  selectedReport: string;
  onGenerate: () => void;
  onExport: (format: "pdf" | "excel" | "csv") => void;
  isGenerating: boolean;
}

export function ReportActions({
  selectedReport,
  onGenerate,
  onExport,
  isGenerating,
}: ReportActionsProps) {
  return (
    <div className="lg:col-span-9">
      {selectedReport ? (
        <div className="space-y-6">
          <ExportActions
            onGenerate={onGenerate}
            onExport={onExport}
            isGenerating={isGenerating}
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Select a report type to configure filters and generate reports
        </div>
      )}
    </div>
  );
}
