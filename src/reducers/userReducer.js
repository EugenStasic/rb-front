import * as types from '../actions/userTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  successMessage: null,
  publicProfiles: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };

    case types.FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case types.FETCH_PUBLIC_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.FETCH_PUBLIC_USER_INFO_SUCCESS:
      return {
        ...state,
        publicProfiles: {
          ...state.publicProfiles,
          [action.userId]: action.payload
        },
        loading: false
      };

    case types.FETCH_PUBLIC_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }


    case types.UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        successMessage: action.successMessage
      };

    case types.UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    
    case types.ADD_USER_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.ADD_USER_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          profilePic: action.payload
        },
        successMessage: action.successMessage,
        loading: false
      };
    
    case types.ADD_USER_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case types.DELETE_USER_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.DELETE_USER_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          profilePic: null
        },
        successMessage: action.successMessage,
        loading: false
      };

    case types.DELETE_USER_PROFILE_PICTURE_FAILURE:
      return{
        ...state,
        error: action.payload.error,
        loading: false
      };
      
    case CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: null,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;