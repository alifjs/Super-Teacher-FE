import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui';
import {FiMoreHorizontal } from 'react-icons/fi';
import { Button } from '@/shared/components/shadui';
import { FaFileAlt } from 'react-icons/fa';
import { TAssignment } from '@/shared/redux/rtk-apis/assignments/assignments.types';
import SubmitAssignmentDialog from '../SubmitAssignmentDialog/SubmitAssignmentDialog';
import { useSelector } from 'react-redux';
import { TRootState } from '@/shared/redux/store';
import SubmissionsDialog from '../SubmissionsDialog/SubmissionsDialog';
import { formatDeadline } from './AssignmentCard.utils';
import { useDeleteAssignmentMutation } from '@/shared/redux/rtk-apis/assignments/assignments.api';
import { toast } from 'sonner';

const AssignmentCard = ({ assignment, onEdit  }: { assignment: TAssignment; onEdit: (assignment: TAssignment) => void  }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false)
  const user = useSelector((state: TRootState) => state.authenticatedUser);


  const handleDownload = () => {
    window.open(assignment.downloadUrl, '_blank');
  };

  const handleEdit = () => {
    onEdit(assignment);
    setMenuOpen(false);
  };

  const [deleteAssignment] = useDeleteAssignmentMutation();

  const handleDelete = async () => {
    try {
      await deleteAssignment({
        id: assignment.id 
      }).unwrap();
      toast.success("Success", {
        description: 'The assignment has been deleted successfully.',
      });
    } catch (error) {
      toast.error("Failed to delete assignment", {
        description: "Something went wrong",
      });
    }
  };


  return (
    <Card className="bg-white w-full rounded-xl shadow sm:px-4 sm:py-2 text-black mt-4">
      <CardHeader className='flex flex-row justify-between'>
        <div className="flex justify-start gap-2">
          <FaFileAlt size={18} />
          <CardTitle className="font-bold text-left">{assignment.title}</CardTitle>
        </div>
        <div className="relative">
            <FiMoreHorizontal size={18} 
            className="text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded-md border">
                <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleEdit}>Edit</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleDelete}>Delete</li>
                </ul>
            </div>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-md'>{assignment.instruction}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end">
        <Button className="bg-black hover:bg-gray-800 text-white px-4 rounded mb-4" onClick={handleDownload}>
          Download
        </Button>
        <div className='flex'>
          <p className='mt-auto'><span className='font-bold'>Deadline : &nbsp;</span>
          <span className={new Date(assignment.deadline) < new Date() ? 'text-red-600' : ''}>
            {formatDeadline(assignment.deadline)}
          </span>
          </p>
          {user.role === 'student' ? (
            assignment.submittedOrNot === false ? (
              <Button
                className="bg-custom-green hover:bg-custom-green-hover text-white px-4 rounded ml-4"
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                Submit
              </Button>
            ) : (
              <Button
                className="text-white px-4 rounded ml-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled
              >
                Submitted
              </Button>
            )
          ) : user.role === 'teacher' ? (
            <Button
              className="bg-custom-green hover:bg-custom-green-hover text-white px-4 rounded ml-4"
              onClick={() => setIsSubmissionDialogOpen(true)}
            >
              Submissions
            </Button>
          ) : null}
        </div>
      </CardFooter>
      <SubmissionsDialog isDialogOpen={isSubmissionDialogOpen} onClose={() => setIsSubmissionDialogOpen(false)} assignmentId={assignment.id} />
      <SubmitAssignmentDialog isDialogOpen={isSubmitDialogOpen} onClose={() => setIsSubmitDialogOpen(false)} assignment={assignment} />
    </Card>
  );
};

export default AssignmentCard;
