import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TExam } from "./exams.types";

const examsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    addExam: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classrooms/${id}/exams`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["Exams"]
    }),
    getAllExams: builder.query({
      query: (id) => `classrooms/${id}/exams`,
      providesTags: ["Exams"],
      transformResponse: (response: TApiResponse<TExam[]>) => response.data,
    }),
  })
});

export const { useAddExamMutation, useGetAllExamsQuery } = examsApi;
