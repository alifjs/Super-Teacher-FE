import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui';
import { TMaterial } from '@/shared/redux/rtk-apis/materials/materials.types';
import { FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import { Button } from '@/shared/components/shadui';
import { FaBook } from 'react-icons/fa';
import { useDeleteMaterialMutation } from '@/shared/redux/rtk-apis/materials/materials.api';
import { toast } from 'sonner';

const MaterialCard = ({ material,  onEdit }: { material: TMaterial; onEdit: (material: TMaterial) => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = () => {
    window.open(material.downloadUrl, '_blank');
  };

  const handleEdit = () => {
    onEdit(material);
    setMenuOpen(false);
  };

  const [deleteMaterial] = useDeleteMaterialMutation();

  const handleDelete = async () => {
    try {
      await deleteMaterial({
        materialId: material.id 
      }).unwrap();
      toast.success("Success", {
        description: 'The material has been deleted successfully.',
      });
    } catch (error) {
      toast.error("Failed to delete material", {
        description: "Something went wrong",
    });
    }
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
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleEdit}>Edit</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleDelete}>Delete</li>
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