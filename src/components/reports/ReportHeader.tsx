
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

interface ReportHeaderProps {
  title: string;
}

export default function ReportHeader({ title }: ReportHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex gap-2">
        <Button>
          <SaveIcon className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
