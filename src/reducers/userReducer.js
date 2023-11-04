import * as types from '../actions/userTypes';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      };

    case types.FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case types.UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      };

    case types.UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;