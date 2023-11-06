import * as types from '../actions/boatTypes';

const initialState = {
  boats: [],
  error: null,
  loading: false,
  successMessage: null
};

const boatReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.BOAT_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.BOAT_REGISTER_SUCCESS:
      return {
        ...state,
        boats: [...state.boats, action.payload],
        successMessage: 'Boat registered successfully!',
        loading: false
      };

    case types.BOAT_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    default:
      return state;
  }
};

export default boatReducer;