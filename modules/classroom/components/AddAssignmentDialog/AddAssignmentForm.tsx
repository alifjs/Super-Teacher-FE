import React from 'react'
import { useForm} from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@/shared/components/shadui"
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"
import { TAddAssignmentForm } from './AddAssignmentForm.types';
import { addAssignmentFormSchema } from './AddAssignmentForm.schema';
import { Textarea } from '@/shared/components/shadui';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import useSubmitAddAssignmentForm from '../../hooks/useSubmitAddAssignmentForm';


const AddAssignmentForm = ({ onClose, classroomId }: { onClose: () => void; classroomId : string }) => {
    const form = useForm<TAddAssignmentForm>({
      resolver: zodResolver(addAssignmentFormSchema),
      mode: "onChange",
    });

    const {formState: { errors }, handleSubmit  } = form

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); 
      onClose();
    };

    const { submitAddAssignmentForm} = useSubmitAddAssignmentForm()

    const handleFormSubmit =async (data: TAddAssignmentForm) => { 
      const success = await submitAddAssignmentForm(data, classroomId);
      if (success) {
        onClose();
      }
    };
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
          form.setValue("file", acceptedFiles[0]);
        }
      }, [form]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "application/pdf": [], "image/png": [], "image/jpeg": [] },
      multiple: false,
    });
      

    return (
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-0 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Title</FormLabel>
                  <FormControl >
                    <Input {...field} placeholder='Enter a title' className="bg-white rounded-[5px]"  />
                  </FormControl>
                  <FormMessage className={cn("text-red-500 mt-1 h-2 sm:h-8",!errors["title"]? " opacity-0" :"" )} >
                    {errors["title"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className='text-custom-green text-md font-bold'>Instruction</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter instruction' className="bg-white rounded-[5px] text-black" rows={4} />
                  </FormControl>
                  <FormMessage className={cn("text-red-500 mt-1 h-2 sm:h-8",!errors["instruction"]? " opacity-0" :"" )} >
                    {errors["instruction"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel className='text-custom-green text-md font-bold'>Deadline</FormLabel>
                <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={
                    field.value
                      ? new Date(new Date(field.value).getTime() + 6 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  className="text-black bg-white rounded-[5px]"
                />


                </FormControl>
                <FormMessage className={cn("text-red-500 mt-1 h-2 sm:h-8",!errors["deadline"]? " opacity-0" :"" )} >
                    {errors["deadline"]?.message?.toString() || " "}
                </FormMessage>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-custom-green text-md font-bold">Upload File</FormLabel>
                <FormControl>
                    <div
                        {...getRootProps()}
                        className={cn(
                            "relative p-11 text-center cursor-pointer transition-all bg-white rounded-lg border-2 border-gray-400",
                            isDragActive ? "border-green-500 bg-green-50" : ""
                        )}
                    >
                    <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-dashed border-gray-400 top-2.5 left-2.5 right-2.5 bottom-2.5"></div>
                    <input {...getInputProps()} />
                    <AiOutlineCloudUpload className="text-gray-400 mx-auto text-2xl sm:text-4xl" />
                    <p className="mt-2 font-semibold text-gray-400 text-sm">
                        <span className="font-bold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PDF, PNG, JPG or JPEG</p>
                    </div>
                </FormControl>
                <FormMessage>
                    {field.value?.name
                        ? `${field.value?.name.slice(0, 50)}${field.value?.name.length > 50 ? "..." : ""} (${field.value?.name.split('.').pop()})`
                        : " "}
                    </FormMessage>

                </FormItem>
            )}
            />
          </div>
          <div className='flex justify-center sm:justify-end mt-2 sm:mt-7'>
            <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
              Cancel
            </Button>
            <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
              Submit
            </Button>
            
          </div>
          </form>
        </Form>
    )

}

export default AddAssignmentForm
