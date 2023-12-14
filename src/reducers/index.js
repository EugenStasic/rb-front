import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import boatReducer from "./boatReducer";
import searchReducer from "./searchReducer";
import bookingReducer from "./bookingReducer";
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    boat: boatReducer,
    booking: bookingReducer,
    search: searchReducer,
    review: reviewReducer
});

export default rootReducer;