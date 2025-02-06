import React from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadui/dialog';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordDialog = ({ isDialogOpen, onClose}: { isDialogOpen: boolean; onClose: () => void}) => {

    return (
        <div>
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className='bg-custom-blue w-[300px] sm:w-[550px]'>
            <DialogHeader>
                <DialogTitle className="text-center sm:text-left font-bold text-2xl">Change Password</DialogTitle>
            </DialogHeader>
                <ChangePasswordForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
        </div>
    );
};

export default ChangePasswordDialog;