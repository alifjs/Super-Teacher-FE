import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";

const messagesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
        query: (classroomId) => `messages/${classroomId}`,
        providesTags:['Messages'],
        transformResponse: (response: TApiResponse<any[]>) => response.data,
    }),
    sendMessage: builder.mutation({
        query: ({formData}) => ({
            url: 'messages',
            method: 'POST',
            body: formData,
        }),
        invalidatesTags:['Messages']
    }),
  })
});

export const {useGetMessagesQuery, useSendMessageMutation} = messagesApi;