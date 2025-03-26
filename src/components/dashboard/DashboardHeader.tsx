
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  compareWith: string;
  setCompareWith: (value: string) => void;
  frequency: string;
  setFrequency: (value: string) => void;
  onAddRequest: () => void;
  onExport: () => void;
}

export function DashboardHeader({
  timeRange,
  setTimeRange,
  compareWith,
  setCompareWith,
  frequency,
  setFrequency,
  onAddRequest,
  onExport,
}: DashboardHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Your overview</h1>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button onClick={onAddRequest} className="rounded-lg gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add Request
          </Button>
          <Button variant="outline" onClick={onExport} className="rounded-lg gap-2" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px] rounded-lg bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="14days">Last 14 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">compared to</span>
        <Select value={compareWith} onValueChange={setCompareWith}>
          <SelectTrigger className="w-[170px] rounded-lg bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="previous">Previous period</SelectItem>
            <SelectItem value="lastYear">Same period last year</SelectItem>
            <SelectItem value="custom">Custom period</SelectItem>
          </SelectContent>
        </Select>
        <Select value={frequency} onValueChange={setFrequency}>
          <SelectTrigger className="w-[100px] rounded-lg bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
