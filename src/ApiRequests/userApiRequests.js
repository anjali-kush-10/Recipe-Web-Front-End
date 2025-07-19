import axios from "axios";

const apiUrl = `http://localhost:5000/user`;

export const loginApi = (email) => {
    return axios.post(`${apiUrl}/login`, email, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const verifyOTP = (otp) => {
    const token = localStorage.getItem('token');
    return axios.post(`${apiUrl}/verify-otp`, otp, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
};

export const completeProfileUser = (data) => {
    const token = localStorage.getItem('token'); // Read token
    return axios.post(`${apiUrl}/complete-profile`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // <- properly set the Bearer token
        }
    });
};


export const getAllUsers=(token,search)=>{
     return axios.get(`${apiUrl}/get-user-list?search=${search}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // <- properly set the Bearer token
        }
    });
}