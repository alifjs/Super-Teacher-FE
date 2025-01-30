import { toast } from "sonner";
import { useAddExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";
import { TAddExamForm } from "../components/AddExamDialog/AddExamForm.types";

const useSubmitAddExamForm = () => {
    const [addExam] = useAddExamMutation();

    const submitAddExamForm = async (formData: TAddExamForm, id: string) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("title", formData.title);
            formDataPayload.append("instruction", formData.instruction);
            formDataPayload.append("scheduleDate", formData.scheduleDate.toISOString());
            formDataPayload.append("file", formData.file);
      
            await addExam({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'New exam has been added successfully.',
            });
            return true;
        } catch (error) {
            toast.error("Failed to add exam", {
                description: "Something went wrong",
            });
            return false;
        }
    };

    return { submitAddExamForm };
}

export default useSubmitAddExamForm;
