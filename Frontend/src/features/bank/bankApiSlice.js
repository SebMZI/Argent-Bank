import { apiSlice } from "../../app/api/apiSlice";

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accounts: builder.query({
      query: (userId) => ({
        url: "/bank/accounts",
        method: "POST",
        body: userId,
      }),
    }),
    transactions: builder.query({
      query: (accId) => ({
        url: `/bank/accounts/${accId}/transactions`,
      }),
    }),
    editTransaction: builder.mutation({
      query: ({ accId, transactionId, editedContent }) => ({
        url: `/bank/accounts/${accId}/transactions/${transactionId}`,
        method: "PUT",
        body: { ...editedContent },
      }),
    }),
  }),
});

export const {
  useAccountsQuery,
  useTransactionsQuery,
  useEditTransactionMutation,
} = bankApiSlice;
