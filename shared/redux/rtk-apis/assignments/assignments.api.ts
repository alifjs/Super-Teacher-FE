import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TAssignment, TAssignmentSubmission } from "./assignments.types";

const assignmentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    addAssignment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classrooms/${id}/assignments`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["Assignments"]
    }),
    addAssignmentSubmission: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classrooms/assignments/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["Assignments"]
    }),
    getAllAssignments: builder.query({
      query: (id) => `classrooms/${id}/assignments`,
      providesTags: ["Assignments"],
      transformResponse: (response: TApiResponse<TAssignment[]>) => response.data,
    }),
    getAllAssignmentSubmissions: builder.query({
      query: (id) => `classrooms/assignments/${id}`,
      transformResponse: (response: TApiResponse<TAssignmentSubmission[]>) => response.data,
    }),
  })
});

export const { useAddAssignmentMutation, useGetAllAssignmentsQuery, useAddAssignmentSubmissionMutation, useGetAllAssignmentSubmissionsQuery } = assignmentsApi;
