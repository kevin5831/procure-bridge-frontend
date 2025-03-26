
export type Currency = 'USD' | 'GBP' | 'ETB' | 'KES' | 'AED' | 'ZAR';

export type WorkflowRule = {
  id: string;
  name: string;
  description: string;
  category: string;
  costRange: {
    min: number;
    max: number;
    currency: Currency;
  };
  status: 'live' | 'draft';
  approvalSteps: {
    order: number;
    role: string;
    requiredLevel?: 'ANY' | 'ALL';
  }[];
};

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';

export type WorkflowInstance = {
  id: string;
  requestId: string;
  requestTitle: string;
  amount: number;
  currency: Currency;
  category: string;
  currentStep: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  requester?: string;
  priority?: 'High' | 'Medium' | 'Low';
  createdAt: Date;
  dueDate?: Date;
  approvalSteps: {
    order: number;
    role: string;
    status: ApprovalStatus;
    assignedTo?: string;
    approvedBy?: string;
    approvedAt?: Date;
    comments?: string;
  }[];
};

export interface WorkflowDefinition {
  id: string;
  name: string;
  category: string;
  nodes: any[];
  edges: any[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
}

export function findMatchingWorkflowRule(
  rules: WorkflowRule[],
  params: {
    category: string;
    totalCost: number;
    currency: Currency;
  }
): WorkflowRule | null {
  // Only consider 'live' rules
  const activeRules = rules.filter(rule => rule.status === 'live');
  
  return activeRules.find(rule => 
    rule.category === params.category &&
    rule.costRange.currency === params.currency &&
    params.totalCost >= rule.costRange.min &&
    params.totalCost <= rule.costRange.max
  ) || null;
}

export function validateWorkflowRules(rules: WorkflowRule[]): { 
  hasGaps: boolean;
  gaps: { category: string; currency: Currency; minRange: number; maxRange: number }[]
} {
  // Group rules by category and currency
  const groupedRules: Record<string, Record<Currency, WorkflowRule[]>> = {};
  
  rules.forEach(rule => {
    if (!groupedRules[rule.category]) {
      groupedRules[rule.category] = {} as Record<Currency, WorkflowRule[]>;
    }
    
    if (!groupedRules[rule.category][rule.costRange.currency]) {
      groupedRules[rule.category][rule.costRange.currency] = [];
    }
    
    groupedRules[rule.category][rule.costRange.currency].push(rule);
  });
  
  const gaps: { category: string; currency: Currency; minRange: number; maxRange: number }[] = [];
  
  // Check for gaps in each category and currency
  Object.entries(groupedRules).forEach(([category, currencyRules]) => {
    Object.entries(currencyRules).forEach(([currency, rules]) => {
      // Sort rules by min value
      const sortedRules = [...rules].sort((a, b) => a.costRange.min - b.costRange.min);
      
      // Check for gaps
      let lastMax = -1;
      sortedRules.forEach(rule => {
        if (rule.costRange.min > lastMax + 1 && lastMax >= 0) {
          gaps.push({
            category,
            currency: currency as Currency,
            minRange: lastMax + 1,
            maxRange: rule.costRange.min - 1
          });
        }
        
        lastMax = Math.max(lastMax, rule.costRange.max);
      });
    });
  });
  
  return {
    hasGaps: gaps.length > 0,
    gaps
  };
}
