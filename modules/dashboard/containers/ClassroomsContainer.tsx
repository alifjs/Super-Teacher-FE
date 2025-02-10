import React, { useEffect, useState } from 'react'
import { useGetClassroomsQuery } from '@/shared/redux/rtk-apis/classrooms/classrooms.api'
import { TClassroom } from '@/shared/redux/rtk-apis/classrooms/classroom.types'
import ClassroomCard from '../components/ClassroomCard/ClasssroomCard'

const ClassroomsContainer = () => {
    const { data} = useGetClassroomsQuery()
    const [classrooms, setClassrooms] = useState<TClassroom[]>([])

    useEffect(() => {
        if (data) {
            setClassrooms(data)
        }
    }, [data])

    return (
        <div className="flex flex-wrap justify-center md:justify-space-around gap-8 sm:gap-14 p-5 sm:p-10">
            {classrooms?.map((classroom) => (
                <ClassroomCard key={classroom.title} classroom={classroom} />
            ))}
        </div>
    )
}

export default ClassroomsContainer

