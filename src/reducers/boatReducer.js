import * as types from '../actions/boatTypes';
import * as reviewTypes from '../actions/reviewTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
  boats: [],
  currentBoat: null,
  loading: false,
  error: null,
  successMessage: null,
};

const boatReducer = (state = initialState, action) => {
  switch (action.type) {
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
        successMessage: action.successMessage,
        loading: false,
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
        loading: true,
      };

    case types.GET_BOAT_DETAILS_SUCCESS:
      return {
        ...state,
        currentBoat: action.payload,
        loading: false,
      };

    case types.GET_BOAT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.GET_ALL_BOAT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_ALL_BOAT_DETAILS_SUCCESS:
      return {
        ...state,
        boats: action.payload,
        loading: false,
      };

    case types.GET_ALL_BOAT_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case types.EDIT_BOAT_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.EDIT_BOAT_LISTING_SUCCESS:
      const updatedBoats = state.boats.map(boat =>
        boat._id === action.payload.boat._id ? action.payload.boat : boat
      );

      let updatedCurrentBoat = state.currentBoat;
      if (state.currentBoat && state.currentBoat._id === action.payload.boat._id) {
        updatedCurrentBoat = action.payload.boat;
      }

      return {
        ...state,
        boats: updatedBoats,
        currentBoat: updatedCurrentBoat,
        successMessage: action.successMessage,
        loading: false,
      };

    case types.EDIT_BOAT_LISTING_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case types.ADD_BOAT_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.ADD_BOAT_IMAGES_SUCCESS:
      let updatedBoatsForImages = state.boats.map(boat =>
        boat._id === action.payload.boat._id ? { ...boat, images: action.payload.images } : boat
      );

      let updatedCurrentBoatForImages = state.currentBoat;
      if (state.currentBoat && state.currentBoat._id === action.payload.boat._id) {
        updatedCurrentBoatForImages = { ...state.currentBoat, images: action.payload.images };
      }

      return {
        ...state,
        boats: updatedBoatsForImages,
        currentBoat: updatedCurrentBoatForImages,
        successMessage: action.successMessage,
        loading: false,
      };

    case types.ADD_BOAT_IMAGES_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case types.DELETE_BOAT_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.DELETE_BOAT_IMAGES_SUCCESS:
      const updatedBoatsAfterDeletion = state.boats.map(boat => {
        if (boat._id === action.payload.boatId) {
          const newImages = [...boat.images];
          newImages.splice(action.payload.imageIndex, 1);
          return { ...boat, images: newImages };
        }
        return boat;
      });

      let updatedCurrentBoatAfterDeletion = { ...state.currentBoat };
      if (state.currentBoat && state.currentBoat._id === action.payload.boatId) {
        const newImages = [...state.currentBoat.images];
        newImages.splice(action.payload.imageIndex, 1);
        updatedCurrentBoatAfterDeletion = { ...state.currentBoat, images: newImages };
      }

      return {
        ...state,
        boats: updatedBoatsAfterDeletion,
        currentBoat: updatedCurrentBoatAfterDeletion,
        successMessage: action.successMessage,
        loading: false,
      };

    case types.DELETE_BOAT_IMAGES_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case types.DELETE_BOAT_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.DELETE_BOAT_LISTING_SUCCESS:
      return {
        ...state,
        boats: state.boats.filter(boat => boat._id !== action.payload),
        loading: false,
        successMessage: action.successMessage,
      };

    case types.DELETE_BOAT_LISTING_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: null,
        error: null,
      };

    case reviewTypes.SUBMIT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case reviewTypes.SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.successMessage
      };

    case reviewTypes.SUBMIT_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default boatReducer;