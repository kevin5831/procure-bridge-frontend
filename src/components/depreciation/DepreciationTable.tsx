
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calculator, PencilLine } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  category: string;
  method: string;
  startDate: Date;
  monthlyDepreciation: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

interface DepreciationTableProps {
  assets: Asset[];
  onViewCalculation: (assetId: string) => void;
  onAdjustDepreciation: (assetId: string) => void;
}

export function DepreciationTable({
  assets,
  onViewCalculation,
  onAdjustDepreciation,
}: DepreciationTableProps) {
  return (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset ID</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead className="text-right">Monthly Depreciation</TableHead>
            <TableHead className="text-right">Accumulated Depreciation</TableHead>
            <TableHead className="text-right">Net Book Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.method}</TableCell>
              <TableCell>{format(asset.startDate, "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                ${asset.monthlyDepreciation.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${asset.accumulatedDepreciation.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${asset.netBookValue.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewCalculation(asset.id)}
                  >
                    <Calculator className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAdjustDepreciation(asset.id)}
                  >
                    <PencilLine className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
