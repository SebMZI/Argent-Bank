import { apiSlice } from "../../app/api/apiSlice";

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accounts: builder.query({
      query: (id) => ({
        url: "/bank/accounts",
        method: "POST",
        body: id,
      }),
    }),
    transactions: builder.query({
      query: (accId) => ({
        url: `/bank/accounts/${accId}/transactions`,
      }),
    }),
  }),
});

export const { useAccountsQuery, useTransactionsQuery } = bankApiSlice;
