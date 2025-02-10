import { ESubjects } from "@/shared/typedefs";

export const getClassroomColor = (subject: ESubjects) => {
    const subjectColors: Record<ESubjects, string> = {
        [ESubjects.Physics]: 'bg-[#4caf50]',
        [ESubjects.Mathematics]: 'bg-[#2196f3]',
        [ESubjects.Chemistry]: 'bg-[#9c27b0]',
        [ESubjects.Biology]: 'bg-[#ff9800]',
        [ESubjects.English]: 'bg-[#ff5722]',
        [ESubjects.Bangla]: 'bg-[#00bcd4]', 
        [ESubjects.History]: 'bg-[#3f51b5]',
        [ESubjects.Geography]: 'bg-[#e91e63]', 
    };

    return subjectColors[subject] || 'bg-[#9e9e9e]';
};
