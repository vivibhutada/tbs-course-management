/** @format */

"use client";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EducationTraining = () => {
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    qualification: "",
    year: null,
    grade: "",
  });
  const [educationData, setEducationData] = useState([]);

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
              <Link href='/trainers/experiance'>
                <button className='bg-blue-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md'>
                  + Add Experiance
                </button>
              </Link>
              <button
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md'
                onClick={() => setModalType("Education")}
              >
                + Add More
              </button>
            </div>
          </div>
          <ul className='mt-4 space-y-2'>
            {educationData.map((entry, index) => (
              <li
                key={index}
                className='bg-green-100 p-3 rounded-lg flex justify-between items-center'
              >
                <span className='text-gray-700'>
                  {entry.qualification} - {entry.year?.getFullYear()} -{" "}
                  {entry.grade}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {modalType && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
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
                  className='w-full p-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
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
