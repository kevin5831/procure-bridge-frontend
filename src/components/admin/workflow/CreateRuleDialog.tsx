
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkflowRule, Currency } from "./types";

interface CreateRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newRule: Omit<WorkflowRule, 'id'>;
  onRuleChange: (rule: Omit<WorkflowRule, 'id'>) => void;
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

export function CreateRuleDialog({ open, onOpenChange, newRule, onRuleChange, onSave }: CreateRuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workflow Rule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Rule Name</Label>
            <Input
              id="new-name"
              value={newRule.name}
              onChange={(e) => onRuleChange({ ...newRule, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newRule.description}
              onChange={(e) => onRuleChange({ ...newRule, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={newRule.costRange.currency}
              onValueChange={(value: Currency) => 
                onRuleChange({
                  ...newRule,
                  costRange: { ...newRule.costRange, currency: value }
                })
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
              <Label htmlFor="new-min-cost">Minimum Cost</Label>
              <Input
                id="new-min-cost"
                type="number"
                value={newRule.costRange.min}
                onChange={(e) => onRuleChange({
                  ...newRule,
                  costRange: { ...newRule.costRange, min: Number(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-max-cost">Maximum Cost</Label>
              <Input
                id="new-max-cost"
                type="number"
                value={newRule.costRange.max}
                onChange={(e) => onRuleChange({
                  ...newRule,
                  costRange: { ...newRule.costRange, max: Number(e.target.value) }
                })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Create Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
