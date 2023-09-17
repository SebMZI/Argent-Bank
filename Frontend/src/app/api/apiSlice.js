import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logOut,
  setNewToken,
} from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const tokenAuth = JSON.parse(localStorage.getItem("persist:auth"));
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else if (tokenAuth.token) {
      headers.set("authorization", `Bearer ${tokenAuth.token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: "/refresh", method: "POST" },
      api,
      extraOptions
    );
    console.log("refresh reseult : ", refreshResult.data.token);

    if (refreshResult?.data) {
      // store the new token
      console.log("New token: ", refreshResult?.data?.token);
      api.dispatch(setNewToken({ token: refreshResult.data.token }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
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
