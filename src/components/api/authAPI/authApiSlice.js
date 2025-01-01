import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (userData) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: userData,
      }),
    }),
  }),
  
    
  
});

export const { useRegisterUserMutation,useVerifyOTPMutation } = authApiSlice;