import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import AddMaterialForm from './AddMaterialForm';
import { TMaterial } from '@/shared/redux/rtk-apis/materials/materials.types';

const AddMaterialDialog = ({isDialogOpen,onClose, classroomId, editData}: {isDialogOpen: boolean; onClose: () => void;classroomId : string; editData?: TMaterial | null;}) => {
    return (
    <div >
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className= 'bg-white w-[300px] sm:w-[500px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>{editData ? 'Edit Material' : 'Add Material'}</DialogTitle>
            </DialogHeader>
                <AddMaterialForm onClose={onClose} classroomId={classroomId} editData={editData}/>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default AddMaterialDialog
