import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { firstname: null, lastname: null, username: null, id: null },
  reducers: {
    setUserInfo: (state, action) => {
      const { user } = action.payload;
      console.log(user);
      if (user) {
        state.firstname = user.firstName;
        state.lastname = user.lastName;
        state.username = user.userName;
        state.id = user._id;
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
