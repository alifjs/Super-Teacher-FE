export type TAssignment={
    id:number;
    title:string;
    instruction: string;
    deadline: Date;
    fileUrl: string;
    downloadUrl: string;
    submittedOrNot: boolean;
}

export type TAssignmentSubmission={
    fileUrl: string; 
    firstName: string; 
    lastName: string; 
    email: string
    downloadUrl: string;
}