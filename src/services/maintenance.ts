import axios from 'axios';

const API_URL = 'http://16.171.11.180';

export interface Maintenance {
  id: number;
  asset: number;
  task_type: string;
  description: string;
  scheduled_date: string;
  status: 'incomplete' | 'in_progress' | 'completed';
  assigned_to: number;
  priority: 'low' | 'medium' | 'high';
  company: number;
  completed_at: string;
  cost: string;
  created_at?: string;
  task_id: string;
  updated_at?: string;
  maintenance_type: 'internal_maintenance' | 'external_maintenance';
  asset_name: string;
}

export const maintenanceService = {
  async getMaintenanceTasks(): Promise<Maintenance[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/maintenance/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMaintenanceById(id: number): Promise<Maintenance> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/maintenance/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createMaintenance(data: Omit<Maintenance, 'id' | 'created_at' | 'updated_at'>): Promise<Maintenance> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.post(`${API_URL}/assets/maintenance/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateMaintenance(id: number, data: Partial<Maintenance>): Promise<Maintenance> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.put(`${API_URL}/assets/maintenance/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteMaintenance(taskId: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
  
    try {
      await axios.delete(`${API_URL}/assets/maintenance/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
};