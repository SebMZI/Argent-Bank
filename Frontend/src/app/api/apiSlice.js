import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setNewToken } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3520/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("Token from apiSlice: ", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      console.log(token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery(
      { url: "/refresh", method: "POST" },
      api,
      extraOptions
    );
    console.log("refresh reseult : ", refreshResult.data.token);

    if (refreshResult?.data) {
      // store the new token
      console.log("New token: ", refreshResult?.data?.token);
      api.dispatch(setNewToken({ token: refreshResult?.data?.token }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
      console.log(result);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
        api.dispatch(logOut());
      }
      console.log("Didn't work: ", refreshResult);
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["transactions", "accounts", "user"],
  endpoints: (builder) => ({}),
});
