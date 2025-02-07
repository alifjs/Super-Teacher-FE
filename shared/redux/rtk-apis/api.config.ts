import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "@/shared/redux/rtk-apis/baseQuery";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: ["Classrooms", "UnenrolledStudents",
    "EnrolledStudents", "Materials","Exams","Assignments","Messages",
    "Classroom","Notifications"],
  endpoints: () => ({}),
});

export default projectApi;
