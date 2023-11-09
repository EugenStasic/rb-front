import * as types from '../actions/userTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  successMessage: null
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