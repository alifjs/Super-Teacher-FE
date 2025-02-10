import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import AddExamForm from './AddExamForm';
import { TExam } from '@/shared/redux/rtk-apis/exams/exams.types';

const AddExamDialog = ({isDialogOpen,onClose, classroomId, editData}: {isDialogOpen: boolean; onClose: () => void;classroomId : string; editData?: TExam | null;}) => {
    return (
    <div >
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className= 'bg-white w-[300px] sm:w-[500px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>{editData ? 'Edit Exam' : 'Schedule Exam'}
                </DialogTitle>
            </DialogHeader>
                <AddExamForm onClose={onClose} classroomId={classroomId}  editData={editData}/>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default AddExamDialog