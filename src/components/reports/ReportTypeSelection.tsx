
import { Card, CardContent } from "@/components/ui/card";
import { ReportTypeCard } from "./ReportTypeCard";
import { reportTypes } from "@/pages/reports/config/reportTypes";

export function ReportTypeSelection() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((type) => (
            <ReportTypeCard key={type.id} {...type} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
