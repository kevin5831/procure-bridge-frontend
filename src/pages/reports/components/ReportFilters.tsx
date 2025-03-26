
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/assets/DateRangePicker";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportType } from "../config/reportTypes";

interface ReportFiltersProps {
  selectedReportType: ReportType | undefined;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  category: string;
  setCategory: (category: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

export function ReportFilters({
  selectedReportType,
  dateRange,
  setDateRange,
  category,
  setCategory,
  location,
  setLocation,
}: ReportFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inactive-assets"
                checked={false}
                onCheckedChange={(checked) => {
                  console.log("Include inactive assets:", checked);
                }}
              />
              <label 
                htmlFor="inactive-assets"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include inactive assets
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="depreciated" />
              <label 
                htmlFor="depreciated" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Fully Depreciated
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {selectedReportType?.requiresDateRange && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <DatePickerWithRange 
                  date={dateRange}
                  onChange={setDateRange}
                  className="w-full"
                />
              </div>
            )}
            {selectedReportType?.requiresCategory && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT Equipment</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedReportType?.requiresLocation && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hq">Headquarters</SelectItem>
                    <SelectItem value="branch1">Branch Office 1</SelectItem>
                    <SelectItem value="branch2">Branch Office 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
