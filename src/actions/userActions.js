import * as types from './userTypes';
import { fetchPublicUserDetails, fetchUserDetails, updateUserInformation } from '../services/users/userService';
import { getErrorMessage } from '../utils/utils';

export const getUserInfo = () => async (dispatch) => {
    dispatch ({ type: types.FETCH_USER_INFO_REQUEST });

    try {
        const userInfo = await fetchUserDetails();
        dispatch({
            type: types.FETCH_USER_INFO_SUCCESS,
            payload: userInfo
        });
    } catch (error) {
        dispatch({
            type: types.FETCH_USER_INFO_FAILURE,
            payload: getErrorMessage(error)
        });
    }
};

export const updateUserInfo = (updateInfo) => async (dispatch) => {
    dispatch({
        type: types.UPDATE_USER_INFO_REQUEST
    });

    try {
        const updatedUser = await updateUserInformation(updateInfo);
        dispatch({
            type: types.UPDATE_USER_INFO_SUCCESS,
            payload: updatedUser,
            successMessage: 'User information updated'
        });
    } catch (error) {
        dispatch({
            type: types.UPDATE_USER_INFO_FAILURE,
            payload: getErrorMessage(error)
        });
    }
};

export const getPublicUserInfo = (userId) => async (dispatch) => {
    dispatch({
        type: types.FETCH_PUBLIC_USER_INFO_REQUEST
    });

    try {
        const publicUser = await fetchPublicUserDetails(userId);
        dispatch({
            type: types.FETCH_PUBLIC_USER_INFO_SUCCESS,
            payload: publicUser,
            userId: userId
        })
    } catch (error) {
        dispatch({
            type: types.FETCH_PUBLIC_USER_INFO_FAILURE,
            payload: getErrorMessage(error)
        })
    }
};