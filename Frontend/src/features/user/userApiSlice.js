import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "POST",
        body: {},
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (username) => ({
        url: "/user/profile",
        method: "PUT",
        body: username,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserQuery, useUpdateUserMutation } = userApiSlice;
