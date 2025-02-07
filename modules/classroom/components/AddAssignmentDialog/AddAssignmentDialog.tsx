import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import AddAssignmentForm from './AddAssignmentForm';

const AddAssignmentDialog = ({isDialogOpen, onClose, classroomId}: {isDialogOpen: boolean; onClose: () => void; classroomId: string}) => {
    return (
    <div >
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className='bg-white w-[300px] sm:w-[500px] max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>Add Assignment</DialogTitle>
                </DialogHeader>
                <AddAssignmentForm onClose={onClose} classroomId={classroomId}/>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default AddAssignmentDialog
