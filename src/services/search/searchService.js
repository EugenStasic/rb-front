import api from '../api';

export const fetchBoatsService = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.price) {
            params.append('price.min', filters.price.min);
            params.append('price.max', filters.price.max);
        }
        if (filters.length) {
            params.append('length.min', filters.length.min);
            params.append('length.max', filters.length.max);
        }
        if (filters.power) {
            params.append('power.min', filters.power.min);
            params.append('power.max', filters.power.max);
        }
        if (filters.location) {
            params.append('location', filters.location);
        }

        const response = await api.get(`/search/search`, { params: Object.fromEntries(params) });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchLocations = async () => {
    try {
        const response = await api.get('/search/locations');
        return response.data;
    } catch (error) {
        throw error;
    }
};