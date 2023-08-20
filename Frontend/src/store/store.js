import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/user.reducer";
import profileReducer from "../reducers/profile.reducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});
