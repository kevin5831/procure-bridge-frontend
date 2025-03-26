
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DisposalDatePicker } from "./disposal/DisposalDatePicker";
import { FinancialImpactDisplay } from "./disposal/FinancialImpactDisplay";
import { disposalReasons, disposalMethods } from "./disposal/constants";
import { calculateFinancialImpact } from "./disposal/utils";
import { DisposalDialogProps } from "./disposal/types";

export function DisposalDialog({
  assetId,
  assetName,
  currentValue,
  open,
  onOpenChange,
  onDisposalComplete
}: DisposalDialogProps) {
  const [reason, setReason] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState<Date>();
  const [salvageValue, setSalvageValue] = useState("0");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const financialImpact = calculateFinancialImpact(salvageValue, currentValue);

  const handleDisposal = async () => {
    if (!reason) {
      toast.error("Please select a reason for disposal");
      return;
    }
    if (!method) {
      toast.error("Please select a disposal method");
      return;
    }
    if (!date) {
      toast.error("Please select a disposal date");
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Mock API call - in a real app, this would be an API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Disposing asset", {
        assetId,
        reason,
        method,
        date,
        salvageValue: parseFloat(salvageValue) || 0,
        financialImpact,
        notes
      });

      toast.success("Asset disposed successfully");
      onOpenChange(false);
      onDisposalComplete?.();
    } catch (error) {
      console.error("Error disposing asset:", error);
      toast.error("Failed to dispose asset. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setMethod("");
    setDate(undefined);
    setSalvageValue("0");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dispose Asset</DialogTitle>
          <DialogDescription>
            {assetName} - Current Value: ${currentValue.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason" className="required">Reason for Disposal</Label>
            <Select onValueChange={setReason} required>
              <SelectTrigger id="reason" className="bg-background">
                <SelectValue placeholder="Select disposal reason" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {disposalReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="method" className="required">Disposal Method</Label>
            <Select onValueChange={setMethod} required>
              <SelectTrigger id="method" className="bg-background">
                <SelectValue placeholder="Select disposal method" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {disposalMethods.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="required">Disposal Date</Label>
            <DisposalDatePicker date={date} onDateChange={setDate} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salvage-value">Salvage Value</Label>
            <Input
              id="salvage-value"
              type="number"
              placeholder="0.00"
              value={salvageValue}
              onChange={(e) => setSalvageValue(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <FinancialImpactDisplay impact={financialImpact} />

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this disposal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleDisposal} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Confirm Disposal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
