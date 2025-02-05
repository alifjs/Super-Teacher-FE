import React from 'react'
import ClassroomChat from '../ClassroomChat/ClassroomChat'
import { useGetClassroomQuery } from '@/shared/redux/rtk-apis/classrooms/classrooms.api'
import ClassroomCard from '@/modules/dashboard/components/ClassroomCard/ClasssroomCard'
import JoinClassCard from '../JoinClassCard/JoinClassCard';
import { TRootState } from '@/shared/redux/store';
import { useSelector } from 'react-redux';


const StreamSection = ({ 
    classroomId, 
    isMobile 
  }: { 
    classroomId: string;
    isMobile: boolean;
  }) => {
    const {data: classroom} = useGetClassroomQuery(classroomId);
    const user = useSelector((state: TRootState) => state.authenticatedUser);
  
    return (
      <div className={`flex gap-2`}>
        {!isMobile && classroom && (
            <div className='flex flex-col w-[680px]'>
                <ClassroomCard classroom={classroom} />
                {!(user.role=='student' && !classroom.meetLink) && (<JoinClassCard classroom={classroom}/>)}
            </div>
        )}
        <ClassroomChat classroomId={classroomId} />
      </div>
    );
  };

export default StreamSection
