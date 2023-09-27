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
  }),
});

export const { useClientsQuery, useGetClientQuery } = bankerApiSlice;
