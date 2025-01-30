import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from "@/shared/components/shadui";
import { FaCalendarAlt, FaFileAlt, FaBook, FaTimes } from "react-icons/fa";
import AddMaterialDialog from "../AddMaterialDialog/AddMaterialDialog";
import { useGetAllMaterialsQuery } from "@/shared/redux/rtk-apis/materials/materials.api";
import MaterialCard from "../MaterialCard/MaterialCard";
import AddExamDialog from "../AddExamDialog/AddExamDialog";
import { useGetAllExamsQuery } from "@/shared/redux/rtk-apis/exams/exams.api";
import ExamCard from "../ExamCard/ExamCard";

const ClassworkSection= ({classroomId}:{classroomId:string})=> {
  const [expanded, setExpanded] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false)
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)

  const {data: materials }= useGetAllMaterialsQuery(classroomId)
  const {data: exams }= useGetAllExamsQuery(classroomId)
  return (
    <>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 pl-0 rounded-lg w-[250px] ">
      {expanded ? (
        <>
          <Button
            variant="outline"
            className="bg-gray-600 text-white flex items-center gap-2 hover:bg-gray-700"
            onClick={() => setExpanded(false)}
          >
            <FaTimes size={18} /> Collapse
          </Button>
          <Button className="bg-custom-green text-white flex items-center gap-2 hover:bg-custom-green-hover" onClick={()=>setIsExamDialogOpen(true)}>
            <FaCalendarAlt size={18} /> Schedule Exam
          </Button>
          <Button className="bg-custom-green text-white flex items-center gap-2 hover:bg-custom-green-hover">
            <FaFileAlt size={18} /> Add Assignment
          </Button>
          <Button className="bg-custom-green text-white flex items-center gap-2 hover:bg-custom-green-hover" onClick={()=>setIsMaterialDialogOpen(true)}>
            <FaBook size={18} /> Add Material
          </Button>
        </>
      ) : (
        <Button
          className="bg-custom-green text-white flex items-center gap-2 hover:bg-custom-green-hover"
          onClick={() => setExpanded(true)}
        >
          Create
        </Button>
      )}
    </div>
          <div className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem title="Upcoming Exams" value="upcoming-exams">
            <AccordionTrigger className='text-2xl hover:no-underline '>
            <div className='flex flex-col w-[100%]'>
                <h2 className="text-2xl font-bold text-left">Exams</h2>
                <div className="w-[100%] h-[2px] bg-white my-2"></div>
            </div>
            </AccordionTrigger>
            <AccordionContent>
            {
              exams?.map((exam)=>
                <ExamCard exam={exam} />
              )
            }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full mt-4">
        <h2 className="text-2xl font-bold">Uploaded Resources</h2>
        <div className="w-full h-[2px] bg-white my-2"></div>
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger className='text-2xl hover:no-underline'>Materials</AccordionTrigger>
            <AccordionContent>
            {
              materials?.map((material)=>
                <MaterialCard material={material} />
              )
            }
            </AccordionContent>
        </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger className='text-2xl hover:no-underline'>Assignments</AccordionTrigger>
            <AccordionContent>
            N/A
            </AccordionContent>
        </AccordionItem>
        </Accordion>
      </div>
     <AddMaterialDialog isDialogOpen={isMaterialDialogOpen} onClose={() => setIsMaterialDialogOpen(false)} classroomId={classroomId} />
     <AddExamDialog isDialogOpen={isExamDialogOpen} onClose={() => setIsExamDialogOpen(false)} classroomId={classroomId} />
    </>
  );
}
export default ClassworkSection