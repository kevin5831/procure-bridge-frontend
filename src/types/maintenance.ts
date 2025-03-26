
export type MaintenanceStatus = "Scheduled" | "In Progress" | "Completed";
export type MaintenanceType = "Internal" | "External";

export interface MaintenanceTask {
  id: string;
  assetId: string;
  assetName: string;
  scheduledDate: string;
  location: string;
  cost: number;
  status: MaintenanceStatus;
  maintenanceType: MaintenanceType;
  description?: string;
  vendor?: string;
  invoiceUrl?: string;
  completedDate?: string;
  completedBy?: string;
  notes?: string[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  }[];
}
