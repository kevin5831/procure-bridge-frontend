
import { ReportType, reportTypes } from "../config/reportTypes";
import { ReportTypeCard } from "./ReportTypeCard";

interface ReportTypeSelectionProps {
  selectedReport: string;
  onSelectReport: (reportId: string) => void;
}

export function ReportTypeSelection({ selectedReport, onSelectReport }: ReportTypeSelectionProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <h2 className="text-lg font-semibold">Select Report Type</h2>
      <div className="space-y-4">
        {reportTypes.map((report) => (
          <ReportTypeCard 
            key={report.id}
            id={report.id}
            title={report.title}
            description={report.description}
            icon={report.icon}
            isSelected={selectedReport === report.id}
            onClick={() => onSelectReport(report.id)}
          />
        ))}
      </div>
    </div>
  );
}
