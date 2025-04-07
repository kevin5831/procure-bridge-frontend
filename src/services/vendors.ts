import axios from 'axios';

const API_URL = 'https://asseter.onrender.com/api';

interface Vendor {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  company: number;
  service_type: string;
  service_categories: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export const vendorService = {
  async getVendors(): Promise<Vendor[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/vendors/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getVendorById(id: number): Promise<Vendor> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/vendors/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createVendor(vendorData: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>): Promise<Vendor> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.post(`${API_URL}/assets/vendors/`, vendorData, {
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

  async updateVendor(id: number, vendorData: Partial<Vendor>): Promise<Vendor> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.put(`${API_URL}/assets/vendors/${id}/`, vendorData, {
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
  async deleteVendor(id: string): Promise<void> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      try {
        await axios.delete(`${API_URL}/assets/vendors/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        throw error;
      }
    }
};