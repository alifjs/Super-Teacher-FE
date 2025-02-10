import { toast } from "sonner";
import { useEditExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";
import { TAddExamForm } from "../components/AddExamDialog/AddExamForm.types";

const useSubmitEditExamForm = () => {
    const [editExam] = useEditExamMutation();

    const submitEditExamForm = async (formData: TAddExamForm, id: number) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("title", formData.title);
            formDataPayload.append("instruction", formData.instruction);
            formDataPayload.append("scheduleDate", formData.scheduleDate.toISOString());
            formDataPayload.append("file", formData.file);
      
            await editExam({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'Exam has been updated successfully.',
            });
            return true;
        } catch (error) {
            toast.error("Failed to update exam", {
                description: "Something went wrong",
            });
            return false;
        }
    };

    return { submitEditExamForm };
}

export default useSubmitEditExamForm;
