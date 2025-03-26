
interface TotalCostDisplayProps {
  totalCost: number;
}

export function TotalCostDisplay({ totalCost }: TotalCostDisplayProps) {
  return (
    <div className="bg-muted p-4 rounded-md">
      <p className="text-sm font-medium">Total Estimated Cost</p>
      <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
    </div>
  );
}
