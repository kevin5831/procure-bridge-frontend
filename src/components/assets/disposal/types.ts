
export type DisposalReason = 
  | "End of Life"
  | "Broken or Damaged"
  | "Sold"
  | "Donated"
  | "Lost or Stolen"
  | "Obsolete Technology"
  | "Replaced with New Asset"
  | "Other";

export interface FinancialImpact {
  amount: number;
  type: "gain" | "loss";
}

export type DisposalMethod = "Scrapped" | "Sold" | "Donated" | "Transferred" | "Other";

export interface DisposalDialogProps {
  assetId: string;
  assetName: string;
  currentValue: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDisposalComplete?: () => void;
}
