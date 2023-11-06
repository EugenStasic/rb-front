import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import boatReducer from "./boatReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    boat: boatReducer
});

export default rootReducer;