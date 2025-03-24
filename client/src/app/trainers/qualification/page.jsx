/** @format */

"use client";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { useRouter } from "next/navigation";

const EducationTraining = () => {
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    qualification: "",
    year: null,
    grade: "",
  });
  const [educationData, setEducationData] = useState([]);
  let programmes = [
    {
      course: "mern stack",
      duration: "7 months",
      mode: "online",
      fees: "₹50000",
      courseType: "paid",
    },
    {
      course: "full stack development",
      duration: "6 months",
      mode: "online",
      fees: "₹45000",
      courseType: "paid",
    },
    {
      course: "data science",
      duration: "9 months",
      mode: "hybrid",
      fees: "₹60000",
      courseType: "paid",
    },
    {
      course: "cyber security",
      duration: "8 months",
      mode: "offline",
      fees: "₹55000",
      courseType: "paid",
    },
    {
      course: "UI/UX design",
      duration: "5 months",
      mode: "online",
      fees: "₹0",
      courseType: "free",
    },
  ];

  const takenQualifications = new Set(
    educationData.map((e) => e.qualification)
  );
  const takenYears = new Set(educationData.map((e) => e.year));

  const closeModal = () => {
    setModalType(null);
    setFormData({
      qualification: "",
      year: null,
      grade: "",
    });
  };

  const handleSave = () => {
    if (!formData.qualification || !formData.year || !formData.grade) return;
    if (takenQualifications.has(formData.qualification)) {
      alert("This qualification has already been added.");
      return;
    }
    if (takenYears.has(formData.year.getFullYear())) {
      alert("This passing year has already been used.");
      return;
    }

    const qualificationsOrder = ["SSC", "HSC", "Bachelor's", "Master's", "PhD"];
    const currentQualIndex = qualificationsOrder.indexOf(
      formData.qualification
    );

    for (const entry of educationData) {
      const entryQualIndex = qualificationsOrder.indexOf(entry.qualification);
      if (
        entryQualIndex < currentQualIndex &&
        formData.year.getFullYear() <= entry.year.getFullYear()
      ) {
        alert(
          `${formData.qualification} year must be greater than ${
            entry.qualification
          } year (${entry.year.getFullYear()}).`
        );
        return;
      }
    }

    setEducationData([...educationData, formData]);
    closeModal();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = (index) => {
    const updatedEducation = educationData.filter((_, i) => i !== index);
    setEducationData(updatedEducation);
  };
  const handleEdit = (index) => {
    const selectedEducation = educationData[index];
    setFormData(selectedEducation);
    setModalType("Edit Education");

    // Remove existing entry temporarily to avoid duplicate validation errors
    setEducationData(educationData.filter((_, i) => i !== index));
  };

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <div className='flex flex-col flex-1 p-6'>
        <h2 className='text-2xl font-semibold text-green-700'>
          Profile &gt; Education and Training
        </h2>

        <div className='bg-white shadow-md rounded-lg p-6 mt-6'>
          <div className='flex justify-between items-center border-b pb-3'>
            <h3 className='text-xl font-semibold text-gray-800'>Education</h3>
            <div className=' flex gap-2'>
              <button
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md'
                onClick={() => setModalType("Education")}
              >
                + Add Education
              </button>
              <Link href='/trainers/experiance'>
                <button  className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md'>
                  + Add Experiance
                </button>
              </Link>
            </div>
          </div>
          {/* display list */}
          <div className='w-[98%] mt-5 m-auto  bg-white p-4 rounded-lg'>
            {educationData.length > 0 && (
              <div className='text-gray-700 text-lg font-bold bg-white'>
                <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
                  <span className='w-35'>Qualification</span>
                  <span className='w-35'>Year</span>
                  <span className='w-35'>Grade/Percentage</span>
                  <span className='w-35'></span>
                </div>
              </div>
            )}
            {educationData.map((edu, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
              >
                <span className='w-35'>{edu.qualification}</span>
                <span className='w-35'>{edu.year.getFullYear()}</span>
                <span className='w-35'>{edu.grade}</span>
                <span className='flex space-x-2 w-35'>
                  <FaRegPenToSquare
                    className='w-5 h-5 cursor-pointer'
                    onClick={() => handleEdit(index)}
                  />
                  <RiDeleteBin6Line
                    className='w-5 h-5 cursor-pointer'
                    onClick={() => handleDelete(index)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {modalType && (
          <div className='fixed inset-0  backdrop-blur-xs bg-opacity-10 flex justify-center items-center'>
            <div className='bg-white w-96 p-6 rounded-lg shadow-lg'>
              <div className='flex justify-between items-center border-b pb-2'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {modalType}
                </h3>
                <button
                  className='text-gray-500 hover:text-gray-700'
                  onClick={closeModal}
                >
                  ✖
                </button>
              </div>

              <div className='mt-4'>
                <select
                  name='qualification'
                  className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  value={formData.qualification}
                  onChange={handleChange}
                >
                  <option value=''>Select Highest Qualification</option>
                  {["SSC", "HSC", "Bachelor's", "Master's", "PhD"].map(
                    (qual) => (
                      <option
                        key={qual}
                        value={qual}
                        disabled={takenQualifications.has(qual)}
                      >
                        {qual}
                      </option>
                    )
                  )}
                </select>
                <DatePicker
                  selected={formData.year}
                  onChange={(date) => setFormData({ ...formData, year: date })}
                  showYearPicker
                  dateFormat='yyyy'
                  className='w-[160%] p-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholderText='Select Year of Passing'
                />
                <input
                  type='text'
                  name='grade'
                  className='w-full p-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Grade/Percentage'
                  value={formData.grade}
                  onChange={handleChange}
                />
              </div>

              <div className='mt-5 flex justify-end space-x-3'>
                <button
                  className='bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg'
                  onClick={closeModal}
                >
                  CANCEL
                </button>
                <button
                  className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg'
                  onClick={handleSave}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationTraining;
