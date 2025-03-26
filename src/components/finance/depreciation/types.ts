export interface AssetCategory {
  id: string;
  name: string;
  ifrsMethod: string;
  ifrsYears: number;
  ifrsResidualValue?: number;
  ifrsStartDate?: Date;
  taxMethod: string;
  taxYears: number;
  taxResidualValue?: number;
  taxStartDate?: Date;
  ifrsClassification?: IFRSClassification;
  ifrsCategory?: IFRSCategory;
  taxCategory?: TaxCategory;
}

export interface IFRSClassification {
  class: string;
  name: string;
  description: string;
}

export interface IFRSCategory {
  code: string;
  name: string;
  class: string;
  description: string;
}

export interface TaxCategory {
  code: string;
  name: string;
  description: string;
  depreciationRate: number;
  isCustom?: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export interface DepreciationAsset {
  assetId: string;
  assetName: string;
  cost: number;
  startDate: string;
  ifrsClass: IFRSClassification;
  ifrsCat: IFRSCategory;
  taxCategory: TaxCategory;
  ifrsMethod: string;
  taxMethod: string;
  ifrsMonthlyDep: number;
  taxMonthlyDep: number;
  ifrsAccumulatedDep: number;
  taxAccumulatedDep: number;
  ifrsNetBookValue: number;
  taxNetBookValue: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  field: string;
  oldValue: string;
  newValue: string;
}

export interface DepreciationImpact {
  monthlyAmount: number;
  annualAmount: number;
  yearlyDepreciation: YearlyDepreciation[];
}

export interface YearlyDepreciation {
  year: number;
  depreciation: number;
  endingBookValue: number;
}
