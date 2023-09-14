import { createSlice } from "@reduxjs/toolkit";

const bankSlice = createSlice({
  name: "bank",
  initialState: { accounts: [] },
  reducers: {
    setTransactions: (state, action) => {
      const { transactions } = action.payload;
      state.transactions = transactions;
    },
  },
});

export const { setTransactions } = bankSlice.actions;

export default bankSlice.reducer;

export const selectCurrentTransactions = (state) => state.bank.transactions;
