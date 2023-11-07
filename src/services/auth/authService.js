import api from '../api';

export const registerService = async (userData) => {
    try {
        const response = await api.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginService = async (email, password) => {
    try {
        return await api.post(`/auth/login`, { email, password });
    } catch (error) {
        throw error;
    }
};

export const logoutService = async () => {
    try {
        const response = await api.post(`/auth/logout`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};