import { EDegree, EEducationLevel, EGender, EMedium, ERoles } from "@/shared/typedefs";

export type TUserProfile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
};

export type TTeacher ={
  id: number;
  highestEducationLevel: string;
  majorSubject: string;
  subjectsToTeach: string[];
}

export type TStudent ={
  id: number;
  address: string;
  phoneNumber: string;
  educationLevel: EEducationLevel;
  medium: EMedium | null;
  grade: string | null;
  degree: EDegree | null;
  degreeName: string | null;
  semesterYear: string | null;
}

export interface TUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: EGender;
  role: ERoles;
  student?: TStudent
  teacher?: TTeacher
}