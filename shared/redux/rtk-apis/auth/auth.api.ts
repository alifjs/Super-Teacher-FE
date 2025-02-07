import { IUser, TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TLoginRequestFields, TLoginResponse } from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequestFields>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    register: builder.mutation({
      query: (user: IUser)=>({
        url : 'auth/register',
        method:'POST',
        body: user
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({email, code}) => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body: {email, code },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email, password}) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: {email, password},
      }),
    }),
    changePassword: builder.mutation({
      query: ({email, currentPassword, newPassword}) => ({
        url: 'auth/change-password',
        method: 'POST',
        body: {email, currentPassword, newPassword},
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation,
   useVerifyOtpMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi;
