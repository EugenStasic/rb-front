import api from "../api";

export const fetchUserDetails = async () => {
    try {
        const response = await api.get(`/user/me`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserInformation = async (updateData) => {
    try {
        const response = await api.patch(`/user/me`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPublicUserDetails = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}`, userId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addUserProfilePicService = async (formData) => {
    try {
        const response = await api.post('/user/me/profile-pic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserProfilePicService = async () => {
    try {
        const response = await api.get('/user/me/profile-pic', {
            responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        throw error;
    }
};

export const deleteUserProfilePicService = async () => {
    try {
        const response = await api.delete('/user/me/profile-pic');
        return response.data;
    } catch (error) {
        throw error;
    }
};