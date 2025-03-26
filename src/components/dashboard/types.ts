
export type RequestStatus = 'DRAFT' | 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';

export const requestStatuses: Record<RequestStatus, { label: string; color: string }> = {
  DRAFT: {
    label: 'Draft',
    color: 'bg-gray-500/10 text-gray-500'
  },
  PENDING: {
    label: 'Pending',
    color: 'bg-blue-500/10 text-blue-500'
  },
  IN_REVIEW: {
    label: 'In Review',
    color: 'bg-yellow-500/10 text-yellow-500'
  },
  APPROVED: {
    label: 'Approved',
    color: 'bg-green-500/10 text-green-500'
  },
  REJECTED: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-500'
  }
};

export interface Request {
  id: string;
  title: string;
  asset_category: string;
  status: RequestStatus;
  total_cost: number;
  created_at: string;
  created_by: string;
  approved_at?: string;
  approved_by?: string;
  creator?: {
    role: string;
  };
  approver?: {
    role: string;
  };
}

