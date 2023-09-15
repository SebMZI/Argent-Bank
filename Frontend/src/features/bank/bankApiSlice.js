import { apiSlice } from "../../app/api/apiSlice";

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accounts: builder.query({
      query: (userId) => ({
        url: "/bank/accounts",
        method: "POST",
        body: userId,
      }),
      providesTags: ["accounts"],
    }),
    transactions: builder.query({
      query: (accId) => ({
        url: `/bank/accounts/${accId}/transactions`,
      }),
      providesTags: (result = [], error, arg) => [
        "transactions",
        ...result.map(({ id }) => ({ type: "Transaction", id })),
      ],
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
