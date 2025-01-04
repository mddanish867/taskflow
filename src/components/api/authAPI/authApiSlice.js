import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Ensures cookies are included in requests
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
    getUser: builder.query({
      query: (email) => ({
        url: `auth/get-user?email=${email}`,        
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),   
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "auth/update-profile",
        method: "POST",
        body: userData,
      }),
    }),
    updatePassword: builder.mutation({
      query: (userData) => ({
        url: "auth/update-password",
        method: "POST",
        body: userData,
      }),
    }),
    enable2FA: builder.mutation({
      query: (userData) => ({
        url: "auth/enable-2fa",
        method: "POST",
        body: userData,
      }),
    }),
    disable2FA: builder.mutation({
      query: (userData) => ({
        url: "auth/disable-2fa",
        method: "POST",
        body: userData,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (userData) => ({
        url: "auth/delete-account",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { 
  useRegisterUserMutation,
  useVerifyOTPMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
  useDeleteAccountMutation
} = authApiSlice;
