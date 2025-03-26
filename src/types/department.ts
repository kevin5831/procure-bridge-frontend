
export interface Department {
  id: string;
  name: string;
  description?: string;
  managerUserId?: string;
  createdAt: string;
}

// Pre-defined departments for mock data
export const defaultDepartments: Department[] = [
  {
    id: "dept_it",
    name: "IT",
    description: "Information Technology Department",
    managerUserId: "1",
    createdAt: "2024-01-01",
  },
  {
    id: "dept_finance",
    name: "Finance",
    description: "Financial Operations Department",
    managerUserId: "2",
    createdAt: "2024-01-01",
  },
  {
    id: "dept_hr",
    name: "Human Resources",
    description: "Human Resources Department",
    createdAt: "2024-01-01",
  },
  {
    id: "dept_ops",
    name: "Operations",
    description: "Operations Department",
    createdAt: "2024-01-01",
  },
];
