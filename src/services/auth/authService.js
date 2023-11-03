import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:5000';

export const registerService = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const loginService = async (email, password) => {
    try {
        return await axios.post(`${BASE_URL}/auth/login`, { email, password });
    } catch (error) {
        throw error;
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/logout`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}