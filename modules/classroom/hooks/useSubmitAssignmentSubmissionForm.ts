import { toast } from "sonner";
import { useAddAssignmentSubmissionMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { TSubmitAssignment } from "../components/SubmitAssignmentDialog/SubmitAssignment.types";

const useSubmitAssignmentSubmissionForm = () => {
    const [submitAssignment] = useAddAssignmentSubmissionMutation()

    const submitAssignmentSubmission= async (formData: TSubmitAssignment, id: number) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("file", formData.file);
      
            await submitAssignment({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'Your assignment has been submitted successfully.',
            });
            return true;
        } catch (error) {
            toast.error("Failed to submit assignment", {
                description: "Something went wrong",
            });
            return false;
        }
    };

    return { submitAssignmentSubmission };
}

export default useSubmitAssignmentSubmissionForm;