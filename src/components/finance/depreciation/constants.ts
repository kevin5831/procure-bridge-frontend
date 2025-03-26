
import type { IFRSClassification, IFRSCategory, TaxCategory, Option } from "./types";

export const IFRS_CLASSIFICATIONS: IFRSClassification[] = [
  {
    class: "PPE",
    name: "Property, Plant & Equipment",
    description: "Tangible assets used in operations"
  },
  {
    class: "INT",
    name: "Intangible Assets",
    description: "Non-physical assets like software and licenses"
  },
  {
    class: "INV",
    name: "Investment Property",
    description: "Property held for rental income or capital appreciation"
  }
];

export const IFRS_CATEGORIES: IFRSCategory[] = [
  {
    code: "COMP_HARD",
    name: "Computer Hardware",
    class: "PPE",
    description: "Computing equipment and accessories"
  },
  {
    code: "COMP_SOFT",
    name: "Computer Software",
    class: "INT",
    description: "Software licenses and applications"
  },
  {
    code: "OFF_EQUIP",
    name: "Office Equipment",
    class: "PPE",
    description: "General office equipment"
  },
  {
    code: "BLDG",
    name: "Buildings",
    class: "PPE",
    description: "Commercial buildings and structures"
  }
];

export const TAX_CATEGORIES: TaxCategory[] = [
  {
    code: "COMP_EQUIP",
    name: "Computer Equipment",
    description: "Computers and related equipment",
    depreciationRate: 0.25
  },
  {
    code: "OFF_EQUIP",
    name: "Office Equipment",
    description: "General office equipment",
    depreciationRate: 0.20
  },
  {
    code: "BLDG",
    name: "Buildings",
    description: "Commercial buildings",
    depreciationRate: 0.05
  }
];

export const DEPRECIATION_METHODS: Option[] = [
  { value: "straight-line", label: "Straight Line" },
  { value: "declining-balance", label: "Declining Balance" },
  { value: "sum-of-years", label: "Sum of Years" },
  { value: "units-of-production", label: "Units of Production" }
];
