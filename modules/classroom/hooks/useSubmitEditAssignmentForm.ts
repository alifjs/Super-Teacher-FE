import { toast } from "sonner";
import { useEditAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { TAddAssignmentForm } from "../components/AddAssignmentDialog/AddAssignmentForm.types";

const useSubmitEditAssignmentForm = () => {
    const [editAssignment] = useEditAssignmentMutation();

    const submitEditAssignmentForm = async (formData: TAddAssignmentForm, id: number) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("title", formData.title);
            formDataPayload.append("instruction", formData.instruction);
            formDataPayload.append("deadline", formData.deadline.toISOString());
            formDataPayload.append("file", formData.file);

            await editAssignment({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'Assignment has been updated successfully.',
            });
            return true;
        } catch (error) {
            toast.error("Failed to update assignment", {
                description: "Something went wrong",
            });
            return false;
        }
    };

    return { submitEditAssignmentForm };
}

export default useSubmitEditAssignmentForm;
