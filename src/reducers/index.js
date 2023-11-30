import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import boatReducer from "./boatReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    boat: boatReducer,
    search: searchReducer
});

export default rootReducer;