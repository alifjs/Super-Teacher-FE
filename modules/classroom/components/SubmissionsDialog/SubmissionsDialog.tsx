import React from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import { useGetAllAssignmentSubmissionsQuery } from '@/shared/redux/rtk-apis/assignments/assignments.api';
import { FiDownload } from 'react-icons/fi'

const SubmissionsDialog = ({ isDialogOpen, onClose, assignmentId }: { isDialogOpen: boolean; onClose: () => void; assignmentId: number }) => {
    const { data: assignmentSubmissions = [] } = useGetAllAssignmentSubmissionsQuery(assignmentId)

    return (
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className="bg-white w-[300px] sm:w-[500px] max-h-[90vh] overflow-y-auto p-4">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-4">Submissions</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    {assignmentSubmissions?.length > 0 ? (
                        assignmentSubmissions.map((submission, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold text-black">{submission.firstName} {submission.lastName}</p>
                                    <p className="text-sm text-gray-600">{submission.email}</p>
                                </div>
                                <a href={submission.downloadUrl} download className="text-custom-green hover:text-green-700">
                                    <FiDownload size={20} />
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg py-4">No submissions</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SubmissionsDialog
