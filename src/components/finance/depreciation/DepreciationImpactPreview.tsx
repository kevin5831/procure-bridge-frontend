
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AssetCategory, DepreciationImpact } from "./types";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DepreciationImpactPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  impact: DepreciationImpact;
  category: Partial<AssetCategory>;
}

export function DepreciationImpactPreview({ 
  open, 
  onOpenChange, 
  impact, 
  category 
}: DepreciationImpactPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Depreciation Preview (IFRS) - {category.name || "New Category"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Monthly Depreciation</h3>
              <p className="text-2xl font-bold">${impact.monthlyAmount.toFixed(2)}</p>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Annual Depreciation</h3>
              <p className="text-2xl font-bold">${impact.annualAmount.toFixed(2)}</p>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Method</h3>
              <p className="text-2xl font-bold">{category.ifrsMethod === "straight-line" ? "Straight-Line" : "Declining Balance"}</p>
            </Card>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Yearly Depreciation Schedule</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on an example asset with acquisition cost of $10,000
            </p>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Annual Depreciation</TableHead>
                    <TableHead>Ending Book Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impact.yearlyDepreciation.map((year) => (
                    <TableRow key={year.year}>
                      <TableCell>{year.year}</TableCell>
                      <TableCell>${year.depreciation.toFixed(2)}</TableCell>
                      <TableCell>${year.endingBookValue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a preview only. Values are calculated based on a sample asset cost of $10,000. 
              Actual depreciation will depend on the specific asset cost and acquisition date.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close Preview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
