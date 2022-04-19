import { combineReducers } from "redux";

import streamReducer from "./streamReducer";
import authReducer from "./authReducer";


export default combineReducers({
    auth: authReducer,
    streams:streamReducer
});