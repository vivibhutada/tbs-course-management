"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { FaRegPenToSquare, FaGraduationCap } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import DataContext from "@/context/DataProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const StudentsList = () => {
  const { students, setStudents } = useContext(DataContext);
  const { editIndex, setEditIndex } = useContext(DataContext); // Track the student being edited
  const { selectedCountry, setSelectedCountry } = useContext(DataContext);
  const { selectedState, setSelectedState } = useContext(DataContext);
  const [studentForm, setStudentForm] = useState(false);

  const { setValue } = useForm();
  const router = useRouter();

  const handleEdit = (index) => {
    const student = students[index];
    setEditIndex(index); // Set the student being edited
    router.push("/students/create");

    // Populate form fields with the selected student's data
    setValue("firstName", student.firstName);
    setValue("lastName", student.lastName);
    setValue("gender", student.gender);
    setValue("dob", student.dob);
    setValue("phoneNumber", student.phoneNumber);
    setValue("alternateNumber", student.alternateNumber);
    setValue("email", student.email);
    setValue("password", student.password);
    setValue("fathersName", student.fathersName);
    setValue("occupation", student.occupation);
    setValue("country", student.country);
    setValue("state", student.state);
    setValue("city", student.city);
    setValue("pincode", student.pincode);
    setValue("address", student.address);

    // Set dropdown values
    setSelectedCountry(student.country);
    setSelectedState(student.state);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index); // Remove the student
    setStudents(updatedStudents);
  };

  const handleCourse = (index) => {
    const student = students[index];
    router.push(`/students/assign_course?id=${student.id}`);
  };

  return (
    <div className='w-full h-full pt-2 flex flex-col gap-5 font-["Poppins"]'>
      <div className="flex flex-row justify-between pb-2">
        {/* students heading */}
        <h3 className="font-semibold text-2xl text-gray-800 ps-2">Students</h3>

        {/* link button for create student page */}
        <Link href="/students/create">
          <button
            onClick={() => setStudentForm(true)}
            className="px-3 py-2 bg-green-900 text-white text-sm rounded-lg flex flex-row justify-center items-center gap-1"
          >
            Create <FiPlus fontSize={20} />
          </button>
        </Link>
      </div>

      {/* students list */}
      <div className="w-full h-full px-6 py-6 bg-white flex flex-row justify-between gap-3 rounded-xl shadow-md">
        {students.length === 0 ? (
          <p className="w-full font-semibold text-center text-lg text-gray-500 py-3">
            No students data available.
          </p>
        ) : (
          <div className="w-full">
            {/* Student List Table */}
            <div className="w-full flex justify-between items-center px-3 py-3 text-base text-gray-600 mb-2">
              {/* <span className='w-25'>Srno.</span> */}
              <span className="w-1/6">First Name</span>
              <span className="w-1/6">Last Name</span>
              {/* <span className="w-1/6">Gender</span> */}
              {/* <span className="w-1/6">D.O.B</span> */}
              <span className="w-1/6">Mobile No.</span>
              {/* <span className="w-1/6">Alt.No.</span> */}
              <span className="w-1/6">Email</span>
              {/* <span className="w-1/6">Father Name</span> */}
              {/* <span className="w-1/6">Occupation</span> */}
              {/* <span className="w-1/6">Country</span> */}
              {/* <span className="w-1/6">State</span> */}
              <span className="w-1/6">City</span>
              {/* <span className="w-1/6">Pincode</span> */}
              {/* <span className="w-1/6">Address</span> */}
              <span className="w-1/10"></span>
            </div>
            {students.map((std, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-center px-3 py-4 border-2 border-gray-200 hover:border-green-600 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-green-50 cursor-pointer rounded-md mb-2 transition-colors duration-200"
              >
                <span className="w-1/6">{std.firstName}</span>
                <span className="w-1/6">{std.lastName}</span>
                {/* <span className="w-1/6">{std.gender}</span> */}
                {/* <span className="w-1/6">{std.dob}</span> */}
                <span className="w-1/6">{std.phoneNumber}</span>
                {/* <span className="w-1/6">{std.alternateNumber}</span> */}
                <span className="w-1/6">{std.email}</span>
                {/* <span className="w-1/6">{std.fathersName}</span> */}
                {/* <span className="w-1/6">{std.occupation}</span> */}
                {/* <span className="w-1/6">{std.country}</span> */}
                {/* <span className="w-1/6">{std.state}</span> */}
                <span className="w-1/6">{std.city}</span>
                {/* <span className="w-1/6">{std.pincode}</span> */}
                {/* <span className="w-1/6>">{std.address}</span> */}
                <span className="w-1/10 flex space-x-3 items-center justify-center">
                  <FaRegPenToSquare
                    fontSize={20}
                    onClick={() => handleEdit(index)}
                    className="cursor-pointer text-gray-500"
                  />
                  <RiDeleteBin6Line
                    fontSize={20}
                    onClick={() => handleDelete(index)}
                    className="cursor-pointer text-gray-500"
                  />
                  <FaGraduationCap
                    fontSize={20}
                    onClick={() => handleCourse(index)}
                  />
                  <LuClipboardList fontSize={20} />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
