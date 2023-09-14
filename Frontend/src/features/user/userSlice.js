import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { firstname: null, lastname: null, username: null, id: null },
  reducers: {
    setUserInfo: (state, action) => {
      const { user } = action.payload;
      if (user && user.body) {
        state.firstname = user.body.firstName;
        state.lastname = user.body.lastName;
        state.username = user.body.userName;
        state.id = user.body.id;
      }
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentFirstname = (state) => state.user.firstname;
export const selectCurrentLastname = (state) => state.user.lastname;
export const selectCurrentUsername = (state) => state.user.username;
export const selectCurrentId = (state) => state.user.id;
