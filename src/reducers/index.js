import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import boatReducer from "./boatReducer";
import searchReducer from "./searchReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    boat: boatReducer,
    booking: bookingReducer,
    search: searchReducer
});

export default rootReducer;