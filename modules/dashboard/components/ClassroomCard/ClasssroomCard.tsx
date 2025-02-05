import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui'
import { TClassroom } from '@/shared/redux/rtk-apis/classrooms/classroom.types'
import { FaCalendarAlt, FaClock, FaUsers, FaEllipsisV } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import { getRandomColor } from './ClassroomCard.helpers';
import { useRouter } from 'next/router';

const ClassroomCard = ({ classroom }: { classroom: TClassroom }) => {
  const router = useRouter();

  const handleClassroomClick = (id: number) => {
    router.push(`/classroom/${id}`);
  };

  return (
    <div 
      className="w-full max-w-sm sm:max-w-md cursor-pointer"
      onClick={() => handleClassroomClick(classroom.id)}
    >
      <Card className="bg-white rounded-lg mt-2 shadow-md transition-transform transform hover:scale-[102%]">
        <CardHeader className={`${getRandomColor()} rounded-t-lg p-4`}>
          <div className="flex justify-between w-full">
            <div>
              <CardTitle className="text-xl md:text-2xl font-semibold">{classroom.title}</CardTitle>
              <p className='mt-1 text-sm md:text-base'>{classroom.subject}</p>
            </div>
            <FaEllipsisV className="text-white cursor-pointer mt-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 bg-gray-800 text-sm text-white p-4">
          <div className="flex items-center text-gray-400">
            <FaCalendarAlt className="mr-2" />
            <p>{classroom.days.join(', ')}</p>
          </div>
          <div className="flex items-center text-gray-400">
            <FaClock className="mr-2" />
            <p>{new Date(classroom.classTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="flex items-center text-gray-400">
            <FaUsers className="mr-2" />
            <p>0</p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-700 rounded-b-lg flex items-center p-3">
          <span className='text-gray-500 text-xs md:text-sm'>ID: {uuidv4()}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClassroomCard;

