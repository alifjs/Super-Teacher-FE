import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ChangePasswordDialog from "@/modules/change-password/components/ChangePasswordDialog/ChangePasswordDialog";
import { useGetUserDetailsQuery } from "../redux/rtk-apis/users/users.api";

const UserProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: userData, isLoading, error } = useGetUserDetailsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user details.</div>;

  const userFields = [
    { title: "Email", value: userData?.email },
    { title: "First Name", value: userData?.firstName },
    { title: "Last Name", value: userData?.lastName },
    { title: "Gender", value: userData?.gender },
  ];

  if (userData?.student) { 
    const { phoneNumber, address, educationLevel, medium, grade, degree, degreeName, semesterYear } = userData.student;
    userFields.push(
      { title: "Phone", value: phoneNumber },
      { title: "Address", value: address },
      { title: "Education Level", value: educationLevel },
      { title: "Medium", value: medium },
      { title: "Grade", value: grade },
      { title: "Degree Level", value: degree },
      { title: "Degree Name", value: degreeName },
      { title: "Semester/Year", value: semesterYear }
    );
  }

  if (userData?.teacher) {
    userFields.push(
      { title: "Highest Education Level", value: userData.teacher.highestEducationLevel },
      { title: "Major Subject", value: userData.teacher.majorSubject },
      { title: "Subjects To Teach", value: userData.teacher.subjectsToTeach.join(", ") }
    );
  }

  const displayedFields = userFields.filter(
    (field) => field.value !== null && field.value !== undefined
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-start items-start overflow-auto z-[1]">
      <div className="bg-gray-900 text-white p-8 w-full max-w-none rounded-b-lg">
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-custom-green text-2xl font-semibold mb-4 flex items-center gap-3">
          User Profile <FaRegEdit />
        </h2>

        <p className="text-gray-400 mb-6">You can change your password from here</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {displayedFields.map((field, index) => (
            <div key={index} className="mb-4">
              <p className="text-custom-green">{field.title}</p>
              <p>{field.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="mt-6 bg-custom-green text-white px-6 py-3 rounded hover:bg-custom-green-hover text-md"
        >
          Change Password
        </button>
        <ChangePasswordDialog isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </div>
    </div>
  );
};

export default UserProfileModal;
