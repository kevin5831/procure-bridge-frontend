
export type CostRange = {
  min: number;
  max: number;
  approvers: {
    role: string;
    action: 'approve';
  }[];
};

export type WorkflowRule = {
  assetCategory: string;
  ranges: CostRange[];
};

export type WorkflowConfiguration = {
  rules: WorkflowRule[];
};
