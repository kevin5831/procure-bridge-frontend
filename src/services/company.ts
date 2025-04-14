import axios from "axios";

const API_URL = 'http://16.171.11.180';

interface CompanyDto{
    name: string;
    legal_name:	string;
    tax_id:	string;
    email:string;
    phone:string;
    website:string;
    address: string;
}

interface CompanyResponse{
    id: string;
    name: string;
    legal_name:	string;
    tax_id:	string;
    email:string;
    phone:string;
    website:string;
    address: string;
    created_at: string;
}

export const companyService = {
    async postCompany(data: unknown): Promise<CompanyResponse>{
        const token = localStorage.getItem("token");
        console.log("this is token", token)
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.post(`${API_URL}/company/`, data, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async putCompany(data: unknown): Promise<CompanyResponse>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        console.log("this is token", token)
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.put(`${API_URL}/company/${companyId}/`, data, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async getCompany(): Promise<CompanyResponse>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        console.log("this is token", companyId)
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.get(`${API_URL}/company/${companyId}/`, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async Company(): Promise<CompanyResponse>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        console.log("this is token", companyId)
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.get(`${API_URL}/company/${companyId}/`, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async postLocation(data: unknown): Promise<any>{
        
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.post(`${API_URL}/company/${companyId}/location/`, data, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async getLocation(): Promise<any>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.get(`${API_URL}/company/${companyId}/location/`, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async getSingleLocation(id: unknown): Promise<any>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.get(`${API_URL}/company/${companyId}/location/${id}/`, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    async putSingleLocation(data: unknown, id: unknown): Promise<any>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.put(`${API_URL}/company/${companyId}/location/${id}/`, data, { headers: headers });
            return response.data;
        }catch(error: any){
            console.log('Signup Error Response:', error.response?.data);

            if (error.response?.data) {
                const errorMessages = Object.entries(error.response.data)
                    .map(([field, messages]) => `${field}: ${messages}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw error;
        }
    },
    
}