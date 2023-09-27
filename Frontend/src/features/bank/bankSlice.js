import { createSlice } from "@reduxjs/toolkit";

const bankSlice = createSlice({
  name: "bank",
  initialState: { accounts: null, transactions: null },
  reducers: {
    setTransactions: (state, action) => {
      const transactions = action.payload;
      state.transactions = transactions;
    },
    setAccounts: (state, action) => {
      const accounts = action.payload;
      state.accounts = accounts;
    },
  },
});

export const { setTransactions, setAccounts } = bankSlice.actions;

export default bankSlice.reducer;

export const selectCurrentTransactions = (state) => state.bank.transactions;
export const selectCurrentAccounts = (state) => state.bank.accounts;
