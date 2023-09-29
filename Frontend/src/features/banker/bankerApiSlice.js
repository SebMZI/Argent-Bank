import { apiSlice } from "../../app/api/apiSlice";

export const bankerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clients: builder.query({
      query: () => ({
        url: "/panel/users",
      }),
    }),
    getClient: builder.query({
      query: (id) => ({
        url: `/panel/users/${id}`,
      }),
    }),
    createTransaction: builder.mutation({
      query: ({ accId, desc, amount }) => ({
        url: "/panel/banker/addTransaction",
        method: "POST",
        body: { accId, desc, amount },
      }),
      invalidatesTags: ["accounts", "transactions"],
    }),
    createAccount: builder.mutation({
      query: ({ user, availableBalance }) => ({
        url: "/panel/banker/addAccount",
        method: "POST",
        body: { userId: user, balance: availableBalance },
      }),
      invalidatesTags: ["accounts"],
    }),
  }),
});

export const {
  useClientsQuery,
  useGetClientQuery,
  useCreateTransactionMutation,
  useCreateAccountMutation,
} = bankerApiSlice;
