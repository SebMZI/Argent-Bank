import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "POST",
        body: {},
      }),
    }),
    updateUser: builder.mutation({
      query: (username) => ({
        url: "/user/profile",
        method: "PUT",
        body: username,
      }),
    }),
  }),
});

export const { useUserQuery, useUpdateUserMutation } = userApiSlice;
