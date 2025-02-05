import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from '@/shared/components/shadui'
import { FaPlus } from 'react-icons/fa';
import AddMeetLinkDialog from '../AddMeetLinkDialog/AddMeetLinkDialog';
import { PiVideoCamera } from "react-icons/pi";
import { TRootState } from '@/shared/redux/store';
import { useSelector } from 'react-redux';
import { TClassroom } from '@/shared/redux/rtk-apis/classrooms/classroom.types';

const JoinClassCard = ({ classroom }: { classroom: TClassroom }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  
  return (
    <Card className="w-full max-w-sm sm:max-w-md bg-gray-800 text-white border border-gray-800 shadow-lg mt-4 px-2 py-2">
        <CardHeader>
            <CardTitle className="text-2xl">Join Class</CardTitle>
            <p className="text-gray-400">
                {classroom.meetLink 
                    ? "Click below to join the virtual classroom"
                    : "Meet link will appear here once available"}
            </p>
        </CardHeader>
        <CardFooter className="flex justify-center mt-4 ">
            {user.role === 'teacher' && !classroom.meetLink ? (
                <button 
                    onClick={() => setIsDialogOpen(true)}
                    className="flex justify-center items-center px-4 py-2 border-2 border-custom-green text-white rounded-lg hover:bg-custom-green transition w-full"
                >
                    <FaPlus className="mr-2" />
                    Add Meet Link
                </button>
            ) : classroom.meetLink ? (
                <a
                    href={classroom.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green-hover transition w-full"
                >
                    <PiVideoCamera className="mr-2" />
                    Join Class
                </a>
            ) : null}
        </CardFooter>
        <AddMeetLinkDialog 
            isDialogOpen={isDialogOpen} 
            onClose={() => setIsDialogOpen(false)} 
            classroomId={classroom.id} 
        />
    </Card>
  )
}

export default JoinClassCard
