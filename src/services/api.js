import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

api.interceptors.request.use(
    config => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers['Authorization'] =  `Bearer ${token}`
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;