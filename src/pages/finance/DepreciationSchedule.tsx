
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown } from "lucide-react";
import { DepreciationAsset } from "@/components/finance/depreciation/types";
import { IFRS_CLASSIFICATIONS, IFRS_CATEGORIES, TAX_CATEGORIES } from "@/components/finance/depreciation/constants";

export default function DepreciationSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ifrs" | "tax">("ifrs");

  // Example data using our defined types
  const currentPeriodData: DepreciationAsset[] = [
    {
      assetId: "AST001",
      assetName: "Computer Software License",
      cost: 1500,
      startDate: "2024-01-01",
      ifrsClass: IFRS_CLASSIFICATIONS[1], // INT class
      ifrsCat: IFRS_CATEGORIES[1], // COMP_SOFT category
      taxCategory: TAX_CATEGORIES[0], // COMP_EQUIP category
      ifrsMethod: "Straight-Line",
      taxMethod: "Declining Balance",
      ifrsMonthlyDep: 41.67,
      taxMonthlyDep: 62.50,
      ifrsAccumulatedDep: 500,
      taxAccumulatedDep: 750,
      ifrsNetBookValue: 1000,
      taxNetBookValue: 750,
    },
    {
      assetId: "AST002",
      assetName: "Office Printer",
      cost: 3000,
      startDate: "2024-01-01",
      ifrsClass: IFRS_CLASSIFICATIONS[0], // PPE class
      ifrsCat: IFRS_CATEGORIES[2], // OFF_EQUIP category
      taxCategory: TAX_CATEGORIES[1], // OFF_EQUIP category
      ifrsMethod: "Straight-Line",
      taxMethod: "Straight-Line",
      ifrsMonthlyDep: 62.50,
      taxMonthlyDep: 62.50,
      ifrsAccumulatedDep: 750,
      taxAccumulatedDep: 750,
      ifrsNetBookValue: 2250,
      taxNetBookValue: 2250,
    },
  ];

  const filteredData = currentPeriodData.filter(asset => 
    asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.assetId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Implementation for CSV export
    console.log("Exporting to CSV...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Depreciation Schedule</h1>
          <p className="text-muted-foreground">
            View and manage depreciation schedules for all assets
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "ifrs" | "tax")}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger
            value="ifrs"
            className="w-full py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-l-md"
          >
            IFRS Depreciation
          </TabsTrigger>
          <TabsTrigger
            value="tax"
            className="w-full py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-r-md"
          >
            Tax Depreciation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ifrs" className="border rounded-lg bg-card p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>IFRS Class</TableHead>
                <TableHead>IFRS Cat</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Monthly Dep.</TableHead>
                <TableHead className="text-right">Accumulated Dep.</TableHead>
                <TableHead className="text-right">Net Book Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((asset) => (
                <TableRow key={asset.assetId}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.ifrsClass.name}</TableCell>
                  <TableCell>{asset.ifrsCat.name}</TableCell>
                  <TableCell>{asset.startDate}</TableCell>
                  <TableCell>{asset.ifrsMethod}</TableCell>
                  <TableCell className="text-right">
                    ${asset.ifrsMonthlyDep.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.ifrsAccumulatedDep.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.ifrsNetBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="tax" className="border rounded-lg bg-card p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Tax Cat</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Monthly Dep.</TableHead>
                <TableHead className="text-right">Accumulated Dep.</TableHead>
                <TableHead className="text-right">Net Book Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((asset) => (
                <TableRow key={asset.assetId}>
                  <TableCell>{asset.assetId}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.taxCategory.name}</TableCell>
                  <TableCell>{asset.startDate}</TableCell>
                  <TableCell>{asset.taxMethod}</TableCell>
                  <TableCell className="text-right">
                    ${asset.taxMonthlyDep.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.taxAccumulatedDep.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.taxNetBookValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
