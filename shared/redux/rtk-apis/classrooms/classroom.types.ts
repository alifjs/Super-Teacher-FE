export type TClassroom = {
    id: string;
    title: string;
    subject: string;
    classTime: Date;
    days: Array<string>;
    meetLink: string;
};

export type TUser = {
    firstName: string;
    lastName: string;
    email: string;
};

export type TUnenrolledStudent = {
    id: number;
    user: TUser;
};

export type TEnrolledStudent = {
    id: number;
    user: TUser;
};

export type TTeacher ={
    user:TUser;
}
export type TClassroomTeacher = {
    teacher: TTeacher
};
