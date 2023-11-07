import * as types from '../actions/boatTypes';

const initialState = {
  boats: [],
  currentBoat: null,
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
        boats: [...state.boats, action.payload.boat],
        successMessage: action.payload.successMessage,
        loading: false
      };

    case types.BOAT_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case types.GET_BOAT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GET_BOAT_DETAILS_SUCCESS:
      return {
        ...state,
        currentBoat: action.payload,
        loading: false
      };

    case types.GET_BOAT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case types.GET_ALL_BOAT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
    case types.GET_ALL_BOAT_DETAILS_SUCCESS:
          return {
            ...state,
            boats: action.payload,
            loading: false
          };
        
    case types.GET_ALL_BOAT_DETAILS_FAILURE:
          return {
            ...state,
            error: action.payload.message,
            loading: false
          };

    case types.EDIT_BOAT_LISTING_REQUEST:
            return {
              ...state,
              loading: true
            };

    case types.EDIT_BOAT_LISTING_SUCCESS:
            return {
              ...state,
              boats: state.boats.map(boat => boat._id !== action.payload._id ? action.payload : boat),
              loading: false
            };

    case types.EDIT_BOAT_LISTING_FAILURE:
            return {
              ...state,
              error: action.payload.message,
              message: false
            }

    case types.DELETE_BOAT_LISTING_REQUEST:
            return {
              ...state,
              loading: true
            };

          case types.DELETE_BOAT_LISTING_SUCCESS:
            return {
              ...state,
              boats: state.boats.filter(boat => boat._id !== action.payload),
              loading: false
            }

          case types.DELETE_BOAT_LISTING_FAILURE:
            return {
              ...state,
              error: action.payload.message,
              loading: false
            }

    default:
      return state;
  }
};

export default boatReducer;