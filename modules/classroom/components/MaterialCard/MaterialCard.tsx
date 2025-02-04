import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui';
import { TMaterial } from '@/shared/redux/rtk-apis/materials/materials.types';
import { FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import { Button } from '@/shared/components/shadui';
import { FaBook } from 'react-icons/fa';

const MaterialCard = ({ material }: { material: TMaterial }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = () => {
    window.open(material.downloadUrl, '_blank');
  };

  return (
    <Card className="bg-white w-full rounded-xl shadow sm:px-4 sm:py-2 text-black mt-4">
      <CardHeader className='flex flex-row justify-between'>
        <div className="flex justify-start gap-2">
          <FaBook size={18} />
          <CardTitle className="font-bold text-left">{material.title}</CardTitle>
        </div>
        <div className="relative">
            <FiMoreHorizontal size={18} 
            className="text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded-md border">
                <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" >Edit</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">Delete</li>
                </ul>
            </div>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-md'>{material.instruction}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="bg-black hover:bg-gray-800 text-white px-4 rounded" onClick={handleDownload}>
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;