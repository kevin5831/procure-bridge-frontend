
import { cn } from "@/lib/utils";
import { FinancialImpact } from "./types";

interface FinancialImpactDisplayProps {
  impact: FinancialImpact;
}

export function FinancialImpactDisplay({ impact }: FinancialImpactDisplayProps) {
  return (
    <div className={cn(
      "px-4 py-2 rounded-md border",
      impact.type === "gain" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
    )}>
      {impact.type === "gain" ? "Gain" : "Loss"}: ${impact.amount.toFixed(2)}
    </div>
  );
}
