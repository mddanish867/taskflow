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
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userData) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: userData,
      }),
    }),
    otpVerification: builder.mutation({
      query: (userData) => ({
        url: "auth/forgot-otp",
        method: "POST",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: "auth/reset-password",
        method: "POST",
        body: userData,
      }),
    }),
  }),
  
    
  
});

export const { useRegisterUserMutation,useVerifyOTPMutation,useLoginUserMutation,useForgotPasswordMutation, useOtpVerificationMutation, useResetPasswordMutation } = authApiSlice;