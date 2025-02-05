import { toast } from "sonner";
import { useUpdateMeetLinkMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

const useSubmitAddMeetLink = () => {
    const [updateMeetLink] = useUpdateMeetLinkMutation();

    const submitMeetLinkUpdate = async (classroomId: string, meetLink: string) => {
        try {
            await updateMeetLink({id: Number(classroomId), meetLink: meetLink}).unwrap();
            toast.success("Success", {
                description:'Meet link updated successfully'
            });
            return true;
        } catch (error) {
            toast.error("Update failed", {
                description: "Failed to update meet link",
            });
            return false;
        }
    };

    return { submitMeetLinkUpdate };
}

export default useSubmitAddMeetLink;