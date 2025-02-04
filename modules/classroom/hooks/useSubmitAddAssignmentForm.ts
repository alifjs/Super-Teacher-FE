import { toast } from "sonner";
import { useAddAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { TAddAssignmentForm } from "../components/AddAssignmentDialog/AddAssignmentForm.types";

const useSubmitAddAssignmentForm = () => {
    const [addAssignment] = useAddAssignmentMutation();

    const submitAddAssignmentForm = async (formData: TAddAssignmentForm, id: string) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("title", formData.title);
            formDataPayload.append("instruction", formData.instruction);
            formDataPayload.append("deadline", formData.deadline.toISOString());
            formDataPayload.append("file", formData.file);
      
            await addAssignment({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'New assignment has been added successfully.',
            });
            return true;
        } catch (error) {
            toast.error("Failed to add assignment", {
                description: "Something went wrong",
            });
            return false;
        }
    };

    return { submitAddAssignmentForm };
}

export default useSubmitAddAssignmentForm;
