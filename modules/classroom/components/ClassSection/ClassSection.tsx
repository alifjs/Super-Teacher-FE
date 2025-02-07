import React from 'react'
import { useGetClassroomQuery } from '@/shared/redux/rtk-apis/classrooms/classrooms.api'
import ClassroomCard from '@/modules/dashboard/components/ClassroomCard/ClasssroomCard'
import JoinClassCard from '../JoinClassCard/JoinClassCard';
import { TRootState } from '@/shared/redux/store';
import { useSelector } from 'react-redux';


const ClassSection = ({classroomId}: {classroomId: string}) => {
    const {data: classroom} = useGetClassroomQuery(classroomId);
    const user = useSelector((state: TRootState) => state.authenticatedUser);
  
    return (
        <div>
        { classroom && (
            <div className='flex flex-col items-center'>
                <ClassroomCard classroom={classroom} />
                {!(user.role=='student' && !classroom.meetLink) && (<JoinClassCard classroom={classroom}/>)}
            </div>
        )}
        </div>
    );
  };

export default ClassSection
