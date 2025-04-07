import axios from "axios";

const API_URL = 'https://asseter.onrender.com/api';

export const departmentService = {
    async postDepartment(data: unknown): Promise<unknown>{
        const token = localStorage.getItem("token");
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.post(`${API_URL}/user/departments/`, data, { headers: headers });
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
    async getDepartment(): Promise<unknown>{
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("userData")
        console.log("this is token", companyId)
        try{
            const headers = {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              };
            const response = await axios.get(`${API_URL}/user/departments/`, { headers: headers });
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
