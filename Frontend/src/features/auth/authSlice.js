import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { data } = action.payload;
      if (data) {
        state.token = data.token;
      }
    },
    setNewToken: (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
      }
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, setNewToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
