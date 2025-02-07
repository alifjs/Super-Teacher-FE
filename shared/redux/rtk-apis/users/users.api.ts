import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import { TUser } from "./users.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),
    getUserDetails: builder.query<TUser, void>({
      query: () => "users/details",
      transformResponse: (response: TApiResponse<TUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery, useGetUserDetailsQuery } = usersApi;
