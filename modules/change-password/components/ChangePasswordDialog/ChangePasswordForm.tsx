import React from 'react'
import { useForm} from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from "@/shared/components/shadui"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"
import { PasswordInput } from '@/shared/components/Form/PasswordInput';
import { TChangePasswordForm } from './ChangePasswordForm.types';
import { changePasswordFormSchema } from './ChangePasswordForm.schema';
import useSubmitChangePasswordForm from '../../hooks/useSubmitChangePasswordForm';
import { useSelector } from 'react-redux';
import { TRootState } from '@/shared/redux/store';

const ChangePasswordForm = ({ onClose}: { onClose: () => void}) => {
    const user = useSelector((state: TRootState) => state.authenticatedUser);
    const form = useForm<TChangePasswordForm>({
      resolver: zodResolver(changePasswordFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const { submitChangePasswordForm } = useSubmitChangePasswordForm()

    const handleFormSubmit = async (data: TChangePasswordForm) => { 
      if (user.email) {
        const response = await submitChangePasswordForm(data, user.email);
        if (response) {
          onClose();
        }
      }
    };

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 ">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your current password"
                    {...field}
                    className="bg-white"
                    isError={false}
                  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-6",!errors["currentPassword"]? " opacity-0" :"" )} >
                  {errors["currentPassword"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your new password"
                    {...field}
                    className="bg-white"
                    isError={false}
                  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-6",!errors["newPassword"]? " opacity-0" :"h-14" )} >
                  {errors["newPassword"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm your password"
                    {...field}
                    className="bg-white"
                    isError={false}
                  />
                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-4",!errors["confirmPassword"]? " opacity-0" :"" )} >
                  {errors["confirmPassword"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          </div>
          <div className='flex justify-start mt-7'>
            <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-custom-green-hover rounded-[5px]">
              Change Password
            </Button>
            
          </div>
          </form>
        </Form>
    )

}

export default ChangePasswordForm