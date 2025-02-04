import React, { useCallback } from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import { TAssignment } from '@/shared/redux/rtk-apis/assignments/assignments.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitAssignmentSchema } from './SubmitAssignment.schema';
import { TSubmitAssignment } from './SubmitAssignment.types';
import { useForm } from 'react-hook-form';
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
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDropzone } from "react-dropzone";
import { cn } from '@/lib/utils';
import useSubmitAssignmentSubmissionForm from '../../hooks/useSubmitAssignmentSubmissionForm';

const SubmitAssignmentDialog = ({isDialogOpen,onClose, assignment}: {isDialogOpen: boolean; onClose: () => void; assignment: TAssignment}) => {
    const form = useForm<TSubmitAssignment>({
        resolver: zodResolver(submitAssignmentSchema),
        mode: "onChange",
    });
    
    const {formState: { errors }, handleSubmit  } = form

    const { submitAssignmentSubmission} = useSubmitAssignmentSubmissionForm()

    const handleFormSubmit =async (data: TSubmitAssignment) => { 
        const success = await submitAssignmentSubmission(data, assignment.id);
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

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        onClose();
    };

    return (
    <div >
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className= 'bg-white w-[300px] sm:w-[500px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>Submit Assignment</DialogTitle>
            </DialogHeader>
                <Form {...form}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    <div className='flex justify-center sm:justify-end mt-4 sm:mt-7'>
                    <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
                        Cancel
                    </Button>
                    <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
                        Submit
                    </Button>
                    
                    </div>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default SubmitAssignmentDialog