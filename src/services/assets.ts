import axios from 'axios';

const API_URL = 'http://16.171.11.180/api';

interface Asset {
  id: string;
  name: string;
  category: string;
  location: {
    id: string;
    name: string;
    code: string;
    type: string;
    country: string;
    city: string;
  };
  status: string;
  value: number;
}

export const assetService = {
  async getAllAssets(): Promise<Asset[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getCompanyLocations(companyId: number): Promise<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const locationsResponse = await axios.get(`${API_URL}/company/${companyId}/location/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return locationsResponse.data || []; 
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  async getUserCompany(): Promise<number> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.company;
    } catch (error) {
      throw error;
    }
  },
  async disposeAsset(assetId: string, disposalData: any): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      await axios.delete(`${API_URL}/assets/${assetId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: disposalData
      });
    } catch (error) {
      throw error;
    }
  },
  async getAssetById(id: string): Promise<Asset> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_URL}/assets/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async createAsset(assetData: any): Promise<Asset> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    try {
      const response = await axios.post(`${API_URL}/assets/`, assetData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.status === true) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Asset creation error:', error);
      throw error;
    }
  },
  async updateAsset(id: string, assetData: Partial<Asset>): Promise<Asset> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.put(`${API_URL}/assets/${id}/`, assetData, {
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

  async deleteAsset(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      await axios.delete(`${API_URL}/assets/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
};