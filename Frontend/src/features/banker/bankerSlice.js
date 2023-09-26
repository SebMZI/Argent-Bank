import { createSlice } from "@reduxjs/toolkit";

const bankerSlice = createSlice({
  name: "banker",
  initialState: { users: null },
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload.clients;
      state.users = users;
    },
  },
});

export const { setUsers } = bankerSlice.actions;

export default bankerSlice.reducer;

export const selectCurrentUsers = (state) => state.banker.users;
