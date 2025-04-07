import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

interface SignupCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Add this interface after your existing interfaces
interface UserDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signup(credentials: SignupCredentials): Promise<any> {
    try {
      const reponse = await axios.post(`${API_URL}/auth/register`, credentials)
      localStorage.setItem('token', reponse.data.access_token);
    } catch (error: any) {
      console.log('Signup Error Response:', error.response?.data);
      throw error;
    }
  },
  
  async getUserDetails(): Promise<UserDetails> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    try {
      const response = await axios.post(`${API_URL}/auth/me`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('userData', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  }
};