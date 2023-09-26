import { apiSlice } from "../../app/api/apiSlice";

export const bankerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clients: builder.query({
      query: () => ({
        url: "/panel/users",
      }),
    }),
  }),
});

export const { useClientsQuery } = bankerApiSlice;
