
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit } from "lucide-react";
import { WorkflowRule } from "./types";

interface WorkflowRuleCardProps {
  rule: WorkflowRule;
  isSelected: boolean;
  onSelect: (rule: WorkflowRule) => void;
  onEdit: (rule: WorkflowRule) => void;
}

export function WorkflowRuleCard({ rule, isSelected, onSelect, onEdit }: WorkflowRuleCardProps) {
  return (
    <Button
      variant="outline"
      className={`w-full justify-between h-auto py-4 px-4 ${
        isSelected ? "border-primary ring-2 ring-primary ring-opacity-20" : ""
      }`}
      onClick={() => onSelect(rule)}
    >
      <div className="flex flex-col items-start text-left gap-1 flex-grow">
        <div className="flex items-center gap-2 w-full justify-between">
          <span className="font-medium">{rule.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              {rule.status}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(rule);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {rule.category} · {rule.costRange.currency} {rule.costRange.min.toLocaleString()} - {rule.costRange.currency} {rule.costRange.max.toLocaleString()}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
    </Button>
  );
}
