
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkflowRule, Currency } from "./types";

interface EditRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: WorkflowRule | null;
  onRuleChange: (rule: WorkflowRule | null) => void;
  onSave: () => void;
}

const currencies: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'ETB', label: 'Ethiopian Birr (ETB)' },
  { value: 'KES', label: 'Kenyan Shilling (KES)' },
  { value: 'AED', label: 'UAE Dirham (AED)' },
  { value: 'ZAR', label: 'South African Rand (ZAR)' },
];

export function EditRuleDialog({ open, onOpenChange, rule, onRuleChange, onSave }: EditRuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Workflow Rule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              value={rule?.name || ''}
              onChange={(e) => onRuleChange(rule ? { ...rule, name: e.target.value } : null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={rule?.description || ''}
              onChange={(e) => onRuleChange(rule ? { ...rule, description: e.target.value } : null)}
            />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={rule?.costRange.currency}
              onValueChange={(value: Currency) => 
                onRuleChange(rule ? {
                  ...rule,
                  costRange: { ...rule.costRange, currency: value }
                } : null)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-cost">Minimum Cost</Label>
              <Input
                id="min-cost"
                type="number"
                value={rule?.costRange.min || 0}
                onChange={(e) => onRuleChange(rule ? {
                  ...rule,
                  costRange: { ...rule.costRange, min: Number(e.target.value) }
                } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-cost">Maximum Cost</Label>
              <Input
                id="max-cost"
                type="number"
                value={rule?.costRange.max || 0}
                onChange={(e) => onRuleChange(rule ? {
                  ...rule,
                  costRange: { ...rule.costRange, max: Number(e.target.value) }
                } : null)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
