
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalculationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: {
    id: string;
    name: string;
    method: string;
    startDate: Date;
    monthlyDepreciation: number;
    accumulatedDepreciation: number;
    netBookValue: number;
    taxMethod?: string;
    taxMonthlyDepreciation?: number;
    taxAccumulatedDepreciation?: number;
    taxNetBookValue?: number;
  } | null;
}

export function CalculationDialog({ open, onOpenChange, asset }: CalculationDialogProps) {
  if (!asset) return null;

  // Mock calculation data - replace with actual calculation logic
  const calculationSteps = [
    {
      period: "Initial",
      date: asset.startDate,
      depreciation: 0,
      accumulated: 0,
      remainingValue: asset.netBookValue + asset.accumulatedDepreciation,
    },
    {
      period: "Month 1",
      date: new Date(asset.startDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      depreciation: asset.monthlyDepreciation,
      accumulated: asset.monthlyDepreciation,
      remainingValue: asset.netBookValue + asset.accumulatedDepreciation - asset.monthlyDepreciation,
    },
    {
      period: "Month 2",
      date: new Date(asset.startDate.getTime() + 60 * 24 * 60 * 60 * 1000),
      depreciation: asset.monthlyDepreciation,
      accumulated: asset.monthlyDepreciation * 2,
      remainingValue: asset.netBookValue + asset.accumulatedDepreciation - (asset.monthlyDepreciation * 2),
    },
    {
      period: "Month 3",
      date: new Date(asset.startDate.getTime() + 90 * 24 * 60 * 60 * 1000),
      depreciation: asset.monthlyDepreciation,
      accumulated: asset.monthlyDepreciation * 3,
      remainingValue: asset.netBookValue + asset.accumulatedDepreciation - (asset.monthlyDepreciation * 3),
    },
  ];

  const taxCalculationSteps = asset.taxMethod ? [
    {
      period: "Initial",
      date: asset.startDate,
      depreciation: 0,
      accumulated: 0,
      remainingValue: (asset.taxNetBookValue || 0) + (asset.taxAccumulatedDepreciation || 0),
    },
    {
      period: "Month 1",
      date: new Date(asset.startDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      depreciation: asset.taxMonthlyDepreciation || 0,
      accumulated: asset.taxMonthlyDepreciation || 0,
      remainingValue: (asset.taxNetBookValue || 0) + (asset.taxAccumulatedDepreciation || 0) - (asset.taxMonthlyDepreciation || 0),
    },
    {
      period: "Month 2",
      date: new Date(asset.startDate.getTime() + 60 * 24 * 60 * 60 * 1000),
      depreciation: asset.taxMonthlyDepreciation || 0,
      accumulated: (asset.taxMonthlyDepreciation || 0) * 2,
      remainingValue: (asset.taxNetBookValue || 0) + (asset.taxAccumulatedDepreciation || 0) - ((asset.taxMonthlyDepreciation || 0) * 2),
    },
    {
      period: "Month 3",
      date: new Date(asset.startDate.getTime() + 90 * 24 * 60 * 60 * 1000),
      depreciation: asset.taxMonthlyDepreciation || 0,
      accumulated: (asset.taxMonthlyDepreciation || 0) * 3,
      remainingValue: (asset.taxNetBookValue || 0) + (asset.taxAccumulatedDepreciation || 0) - ((asset.taxMonthlyDepreciation || 0) * 3),
    },
  ] : null;

  const DepreciationTable = ({ steps }: { steps: typeof calculationSteps }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Period</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Depreciation</TableHead>
          <TableHead className="text-right">Accumulated</TableHead>
          <TableHead className="text-right">Remaining Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {steps.map((step) => (
          <TableRow key={step.period}>
            <TableCell>{step.period}</TableCell>
            <TableCell>{format(step.date, "MMM d, yyyy")}</TableCell>
            <TableCell className="text-right">${step.depreciation.toFixed(2)}</TableCell>
            <TableCell className="text-right">${step.accumulated.toFixed(2)}</TableCell>
            <TableCell className="text-right">${step.remainingValue.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Depreciation Calculation - {asset.name}</DialogTitle>
          <DialogDescription>
            Book Method: {asset.method} | Start Date: {format(asset.startDate, "MMM d, yyyy")}
            {asset.taxMethod && ` | Tax Method: ${asset.taxMethod}`}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book Depreciation</TabsTrigger>
            <TabsTrigger value="tax" disabled={!asset.taxMethod}>
              Tax Depreciation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            <DepreciationTable steps={calculationSteps} />
          </TabsContent>
          {taxCalculationSteps && (
            <TabsContent value="tax">
              <DepreciationTable steps={taxCalculationSteps} />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
