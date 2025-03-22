/** @format */

"use client";
import React, { useState } from "react";

export const TrainerExperienceForm = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    startDate: "",
    endDate: "",
    designation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateExperience = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const years = endDate.getFullYear() - startDate.getFullYear();
    return years > 0 ? `${years} years` : "Less than a year";
  };

  const validateForm = () => {
    let newErrors = {};
    const today = new Date();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (!formData.company.trim())
      newErrors.company = "Company name is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required.";

    if (formData.startDate && start > today)
      newErrors.startDate = "Start date cannot be in the future.";
    if (formData.endDate) {
      if (end > today) newErrors.endDate = "End date cannot be in the future.";
      if (start && end <= start)
        newErrors.endDate = "End date must be after the start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const totalExperience = calculateExperience(
      formData.startDate,
      formData.endDate
    );
    setExperienceData([...experienceData, { ...formData, totalExperience }]);
    setFormData({ company: "", startDate: "", endDate: "", designation: "" });
    setErrors({});
  };

  return (
    <div className='flex flex-col items-center p-8 bg-gray-100 rounded-2xl text-white'>
      <div className="bg-white px-4 py-2 rounded-lg w-5xl -mt-8">
        <h2 className='text-2xl font-bold mb-3 text-black md:ml-6'>
          Trainer Experience Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg  w-full max-w-lg text-gray-900'
        >
          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>Company Name:</label>
            <input
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.company && (
              <p className='text-red-600 text-sm mt-1'>{errors.company}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>Start Date:</label>
            <input
              type='date'
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.startDate && (
              <p className='text-red-600 text-sm mt-1'>{errors.startDate}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>End Date:</label>
            <input
              type='date'
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.endDate && (
              <p className='text-red-600 text-sm mt-1'>{errors.endDate}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>Designation:</label>
            <input
              type='text'
              name='designation'
              value={formData.designation}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.designation && (
              <p className='text-red-600 text-sm mt-1'>{errors.designation}</p>
            )}
          </div>

          <button
            type='submit'
            className='bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-md w-full font-semibold transition duration-300 outline-none'
          >
            Add Experience
          </button>
        </form>
      </div>

      {experienceData.length > 0 && (
        <div className='mt-8 w-full max-w-5xl'>
          <h3 className='text-2xl font-bold mb-4 text-black'>Experience List</h3>
          <div className='overflow-x-auto'>
            <table className='w-full bg-white border border-gray-200 rounded-lg shadow-md text-gray-900'>
              <thead className='bg-green-700 text-white'>
                <tr>
                  <th className='border p-3 text-left'>Company</th>
                  <th className='border p-3 text-left'>Start Date</th>
                  <th className='border p-3 text-left'>End Date</th>
                  <th className='border p-3 text-left'>Designation</th>
                  <th className='border p-3 text-left'>Total Experience</th>
                </tr>
              </thead>
              <tbody>
                {experienceData.map((exp, index) => (
                  <tr
                    key={index}
                    className='border-t hover:bg-gray-100 transition duration-200'
                  >
                    <td className='border p-3'>{exp.company}</td>
                    <td className='border p-3'>{exp.startDate}</td>
                    <td className='border p-3'>{exp.endDate}</td>
                    <td className='border p-3'>{exp.designation}</td>
                    <td className='border p-3 font-semibold'>
                      {exp.totalExperience}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerExperienceForm;
