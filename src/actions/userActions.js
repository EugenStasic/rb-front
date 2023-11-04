import * as types from './userTypes';
import { fetchUserDetails, updateUserInformation } from '../services/users/userService';

export const getUserInfo = (userId) => async (dispatch) => {
    dispatch ({ type: types.FETCH_USER_INFO_REQUEST });

    try {
        const userInfo = await fetchUserDetails(userId);
        dispatch({
            type: types.FETCH_USER_INFO_SUCCESS,
            payload: userInfo
        });
    } catch (error) {
        dispatch({
            type: types.FETCH_USER_INFO_FAILURE,
            payload: error.message
        });
    }
};

export const updateUserInfo = (userId, updateInfo) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USER_INFO_REQUEST });

    try {
        const updatedUser = await updateUserInformation(userId, updateInfo);
        dispatch({
            type: types.UPDATE_USER_INFO_SUCCESS,
            payload: updatedUser
        });
    } catch (error) {
        dispatch({
            type: types.UPDATE_USER_INFO_FAILURE,
            payload: error.message
        });
    }
};