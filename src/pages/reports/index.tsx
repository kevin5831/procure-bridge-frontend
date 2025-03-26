
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ReportTypeSelection } from "./components/ReportTypeSelection";
import { ReportHeader } from "./components/ReportHeader";
import { ReportFilters } from "./components/ReportFilters";
import { reportTypes } from "./config/reportTypes";

export default function Reports() {
  const [selectedReportId, setSelectedReportId] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const selectedReportType = reportTypes.find(report => report.id === selectedReportId);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <ReportHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ReportTypeSelection selectedReport={selectedReportId} onSelectReport={setSelectedReportId} />
        <div className="lg:col-span-3">
          <ReportFilters
            selectedReportType={selectedReportType}
            dateRange={dateRange}
            setDateRange={setDateRange}
            category={category}
            setCategory={setCategory}
            location={location}
            setLocation={setLocation}
          />
        </div>
      </div>
    </div>
  );
}
