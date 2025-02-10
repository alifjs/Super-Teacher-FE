import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";

export const notificationsApi = projectApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<any[], void>({
          query: () => 'notifications',
          transformResponse: (response: TApiResponse<any[]>) => response.data,
        }),
      })
});

export const {useGetNotificationsQuery} = notificationsApi;