import NavbarContainer from '@/shared/components/NavbarContainer/NavbarContainer'
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils';
import PeopleSection from '../../components/PeopleSection/PeopleSection';
import ClassworkSection from '../../components/ClassworkSection/ClassworkSection';
import ClassroomChat from '../../components/ClassroomChat/ClassroomChat';
import StreamSection from '../../components/StreamSection/StreamSection';
import ClassSection from '../../components/ClassSection/ClassSection';

const ClassroomContainer = ({ classroomId }: { classroomId: string }) => {
  const [activeTab, setActiveTab] = useState("Stream");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1170);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = isMobile
    ? ["Stream", "Class", "Classwork", "People"]
    : ["Stream", "Classwork", "People"];

  return (
    <div>
      <NavbarContainer />
      <div className="pt-2 px-0 sm:px-8 text-white">
        <div className="flex justify-center space-x-4 sm:space-x-8 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                "w-1/4 sm:w-1/3 text-center py-2 px-4 text-md font-semibold",
                activeTab === tab
                  ? "text-white border-b-2 border-custom-green"
                  : "text-gray-400"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === "Stream" && <StreamSection classroomId={classroomId} isMobile={isMobile}  />}
          {activeTab === "Classwork" && <ClassworkSection classroomId={classroomId} />}
          {activeTab === "People" && <PeopleSection classroomId={classroomId} />}
          {activeTab === "Class" && isMobile && <ClassSection classroomId={classroomId} />}
        </div>
      </div>
    </div>
  );
};

export default ClassroomContainer;

