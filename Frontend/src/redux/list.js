import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todoSlice";
import user from "./slices/userSlice";

const reducer = combineReducers({
  todo,
  user,
});

export default configureStore({
  reducer,
});
