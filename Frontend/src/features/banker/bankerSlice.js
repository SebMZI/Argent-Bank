import { createSlice } from "@reduxjs/toolkit";

const bankerSlice = createSlice({
  name: "banker",
  initialState: { users: null, clientInfo: null },
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload.clients;
      state.users = users;
    },
    setClient: (state, action) => {
      const client = action.payload?.result;
      state.clientInfo = client;
    },
  },
});

export const { setUsers, setClient } = bankerSlice.actions;

export default bankerSlice.reducer;

export const selectCurrentUsers = (state) => state.banker.users;
export const selectCurrentClient = (state) => state.banker.clientInfo;
