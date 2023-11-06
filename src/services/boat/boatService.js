import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const registerBoatService = async (userId, boatData) => {
    try {
        const response = await axios.post(`${BASE_URL}/boat/register`, {
            ...boatData,
            ownerId: userId
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}