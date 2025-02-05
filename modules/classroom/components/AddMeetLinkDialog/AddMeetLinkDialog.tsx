import React from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadui/dialog';
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    Button,
    FormControl,
    FormLabel,
    Input,
} from "@/shared/components/shadui"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { TAddMeetLinkForm } from './AddMeetLinkForm.types';
import { addMeetLinkFormSchema } from './AddMeetLinkForm.schema';
import useSubmitAddMeetLink from '../../hooks/useSubmitAddMeetLink';

const AddMeetLinkDialog = ({ isDialogOpen, onClose, classroomId}: { isDialogOpen: boolean; onClose: () => void; classroomId: string}) => {
    const form = useForm<TAddMeetLinkForm>({
        resolver: zodResolver(addMeetLinkFormSchema),
        mode: "onChange",
    });
    const {formState: { errors }, handleSubmit  } = form

    const { submitMeetLinkUpdate } = useSubmitAddMeetLink()

    const handleFormSubmit = (data: TAddMeetLinkForm) => { 
        submitMeetLinkUpdate(classroomId, data.meetLink); 
        form.reset();
        onClose()
    };

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        form.reset();
        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <div>
        <Dialog open={isDialogOpen} onOpenChange={handleClose}>
            <DialogOverlay />
            <DialogContent className='bg-white w-[300px] sm:w-[550px]'>
            <DialogHeader>
                <DialogTitle className="text-center sm:text-left font-bold text-2xl">Update Meet Link</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
                <Form {...form} >
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <FormField
                            control={form.control}
                            name="meetLink"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className='text-custom-green text-md font-bold'>Meet Link</FormLabel>
                                <FormControl >
                                    <Input {...field} placeholder='Paste the link here' className="bg-white rounded-[5px]"  />
                                </FormControl>
                                <FormMessage className={cn("text-red-500 mt-1 h-2 sm:h-8",!errors["meetLink"]? " opacity-0" :"" )} >
                                    {errors["meetLink"]?.message?.toString() || " "}
                                </FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-center sm:justify-end mt-6'>
                        <Button onClick={handleCancelClick}  className="bg-purple-600 text-white hover:bg-purple-700 rounded-[5px] mr-5">
                            Cancel
                        </Button>
                        <Button type="submit" variant="ghost" className="bg-custom-green text-white hover:bg-green-700 rounded-[5px]">
                            Submit
                        </Button>
                        
                        </div>
                    </form>
                </Form>
            </div>
            </DialogContent>
        </Dialog>
        </div>
    );
};

export default AddMeetLinkDialog;
