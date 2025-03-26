
export const assetStatuses = [
  "In Service",
  "Under Repair",
  "Retired",
  "Stored",
  "With Worker",
  "In Transit",
] as const;

export type AssetStatus = (typeof assetStatuses)[number];
