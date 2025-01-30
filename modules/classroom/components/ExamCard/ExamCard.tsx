import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui';
import { FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import { Button } from '@/shared/components/shadui';
import { FaBook } from 'react-icons/fa';
import { TExam } from '@/shared/redux/rtk-apis/exams/exams.types';

const ExamCard = ({ exam }: { exam: TExam }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = () => {
    window.open(exam.downloadUrl, '_blank');
  };

  return (
    <Card className="bg-white w-full rounded-xl shadow sm:px-4 sm:py-2 text-black mt-4">
      <CardHeader className='flex flex-row justify-between'>
        <div className="flex justify-start gap-2">
          <FaBook size={18} />
          <CardTitle className="font-bold text-left">{exam.title}</CardTitle>
        </div>
        <div className="relative">
            <FiMoreHorizontal size={18} 
            className="text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded-md border">
                <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => console.log('Edit', exam.id)}>Edit</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => console.log('Delete', exam.id)}>Delete</li>
                </ul>
            </div>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-md'>{exam.instruction}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end">
        <Button className="bg-black hover:bg-gray-800 text-white px-4 rounded mb-4" onClick={handleDownload}>
          Download
        </Button>
        <p ><span className='font-bold'>Scheduled at : &nbsp;</span>
            {new Date(new Date(exam.scheduleDate).getTime())
                .toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                })
                .replace(/,/g, "") 
                .replace(/(\d{1,2}) (\d{1,2}) (\d{4})/, "$1/$2/$3")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;