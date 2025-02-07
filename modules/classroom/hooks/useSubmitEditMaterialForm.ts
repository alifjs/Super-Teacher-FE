import { toast } from "sonner";
import { useEditMaterialMutation } from "@/shared/redux/rtk-apis/materials/materials.api";
import { TAddMaterialForm } from "../components/AddMaterialDialog/AddMaterialForm.types";

const useSubmitEditMaterialForm = () => {
  const [editMaterial] = useEditMaterialMutation();

  const submitEditMaterialForm = async (formData: TAddMaterialForm, classroomId: string, materialId: number) => {
    try {
        const formDataPayload = new FormData();
        formDataPayload.append("title", formData.title);
        formDataPayload.append("instruction", formData.instruction);
        formDataPayload.append("file", formData.file);
        
        await editMaterial({ classroomId, materialId, formData: formDataPayload }).unwrap();
        toast.success("Success", {
            description: "Material has been updated successfully.",
        });
        return true;
    } catch (error) {
      toast.error("Failed to update material", {
        description: "Something went wrong",
      });
      return false;
    }
  };

  return { submitEditMaterialForm };
};

export default useSubmitEditMaterialForm;
