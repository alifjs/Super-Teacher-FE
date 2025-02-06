import { useChangePasswordMutation} from "@/shared/redux/rtk-apis/auth/auth.api";
import { toast } from "sonner";
import { TChangePasswordForm } from "../components/ChangePasswordDialog/ChangePasswordForm.types";

const useSubmitChangePasswordForm = () => {
    const [changePassword] =  useChangePasswordMutation();

    const submitChangePasswordForm = async (formData: TChangePasswordForm , email: string) => {
        try {
            const payload={
                email: email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }
            const response = await changePassword(payload).unwrap();
            toast.success("Success", {
                description: 'New password has been set successfully.',
            });
            return true
        } catch (error) {
            toast.error("Failed", {
                description: 'Password change was not successful!',
            });
            return false
        }
    };
    return { submitChangePasswordForm }
}

export default useSubmitChangePasswordForm