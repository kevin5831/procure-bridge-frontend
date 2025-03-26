
import { useState } from 'react';
import { WorkflowRule, Currency, findMatchingWorkflowRule } from '@/components/admin/workflow/types';
import { useToast } from '@/components/ui/use-toast';

export function useWorkflowRules() {
  const [rules, setRules] = useState<WorkflowRule[]>([]);
  const { toast } = useToast();

  const findApplicableRule = (
    category: string,
    totalCost: number,
    currency: Currency
  ) => {
    const matchingRule = findMatchingWorkflowRule(rules, {
      category,
      totalCost,
      currency,
    });

    if (!matchingRule) {
      toast({
        title: "No matching workflow rule found",
        description: "Please ensure appropriate workflow rules are configured for this request type and amount.",
        variant: "destructive",
      });
      return null;
    }

    return matchingRule;
  };

  const validateRuleCoverage = () => {
    // Check for gaps in cost ranges
    const rulesByCategoryAndCurrency = rules.reduce((acc, rule) => {
      const key = `${rule.category}-${rule.costRange.currency}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(rule);
      return acc;
    }, {} as Record<string, WorkflowRule[]>);

    const gaps: string[] = [];

    Object.entries(rulesByCategoryAndCurrency).forEach(([key, categoryRules]) => {
      // Sort rules by min cost
      const sortedRules = categoryRules.sort((a, b) => a.costRange.min - b.costRange.min);
      
      // Check for gaps between rules
      for (let i = 1; i < sortedRules.length; i++) {
        if (sortedRules[i].costRange.min > sortedRules[i-1].costRange.max + 1) {
          gaps.push(
            `Gap found in ${key}: between ${sortedRules[i-1].costRange.max} and ${sortedRules[i].costRange.min}`
          );
        }
      }
    });

    return gaps;
  };

  const addRule = (rule: Omit<WorkflowRule, 'id'>) => {
    const newRule: WorkflowRule = {
      ...rule,
      id: crypto.randomUUID(),
    };
    setRules(prev => [...prev, newRule]);

    // Validate coverage after adding
    const gaps = validateRuleCoverage();
    if (gaps.length > 0) {
      toast({
        title: "Workflow Coverage Gaps Detected",
        description: gaps.join('\n'),
        variant: "destructive", // Changed from "warning" to "destructive"
      });
    }
  };

  return {
    rules,
    setRules,
    findApplicableRule,
    validateRuleCoverage,
    addRule,
  };
}
