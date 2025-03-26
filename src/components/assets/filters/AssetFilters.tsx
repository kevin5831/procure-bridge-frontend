
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/assets/DateRangePicker";
import { CustomSelect } from "@/components/ui/custom-select";
import { DateRange } from "react-day-picker";
import { AssetLocation } from "@/types/asset";

interface AssetFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  categories: string[];
  statuses: string[];
  locations: AssetLocation[];
}

export function AssetFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedLocation,
  setSelectedLocation,
  dateRange,
  setDateRange,
  categories = [], // Provide default empty array
  statuses = [], // Provide default empty array
  locations = [], // Provide default empty array
}: AssetFiltersProps) {
  const categoryOptions = (categories || []).map(cat => ({
    value: cat,
    label: cat
  }));

  const statusOptions = (statuses || []).map(status => ({
    value: status,
    label: status
  }));

  const locationOptions = (locations || []).map(loc => ({
    value: loc.id,
    label: `${loc.name} (${loc.code}) - ${loc.city}, ${loc.country}`
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <CustomSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Select Category"
          />
          <CustomSelect
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Select Status"
          />
          <CustomSelect
            options={locationOptions}
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Select Location"
          />
          <DatePickerWithRange 
            className="w-full"
            onChange={setDateRange}
            date={dateRange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
