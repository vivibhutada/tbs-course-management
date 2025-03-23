// /** @format */

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaRegPenToSquare } from "react-icons/fa6";
// import { RiDeleteBin6Line } from "react-icons/ri";

// export const TrainerExperienceForm = () => {
//   const [experienceData, setExperienceData] = useState([]);
//   const [formData, setFormData] = useState({
//     company: "",
//     startDate: "",
//     endDate: "",
//     designation: "",
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const calculateExperience = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const years = endDate.getFullYear() - startDate.getFullYear();
//     return years > 0 ? `${years} years` : "Less than a year";
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     const today = new Date();
//     const start = new Date(formData.startDate);
//     const end = new Date(formData.endDate);

//     if (!formData.company.trim())
//       newErrors.company = "Company name is required.";
//     if (!formData.startDate) newErrors.startDate = "Start date is required.";
//     if (!formData.endDate) newErrors.endDate = "End date is required.";
//     if (!formData.designation.trim())
//       newErrors.designation = "Designation is required.";

//     if (formData.startDate && start > today)
//       newErrors.startDate = "Start date cannot be in the future.";
//     if (formData.endDate) {
//       if (end > today) newErrors.endDate = "End date cannot be in the future.";
//       if (start && end <= start)
//         newErrors.endDate = "End date must be after the start date.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const totalExperience = calculateExperience(
//       formData.startDate,
//       formData.endDate
//     );
//     setExperienceData([...experienceData, { ...formData, totalExperience }]);
//     setFormData({ company: "", startDate: "", endDate: "", designation: "" });
//     setErrors({});
//   };


//   return (
//     <div className='flex flex-col items-center p-8 bg-gray-100 rounded-2xl text-white'>
//       <div className='px-6 py-4 rounded-lg w-full max-w-5xl -mt-8 bg-white shadow-lg'>
//         <h2 className='text-2xl font-bold mb-5 text-black text-center'>
//           Trainer Experience Form
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className='bg-white p-6 rounded-lg w-full text-gray-900'
//         >
//           {/* Company Name */}
//           <div className='mb-4'>
//             <label className='block mb-2 font-semibold'>Company Name:</label>
//             <input
//               type='text'
//               name='company'
//               value={formData.company}
//               onChange={handleChange}
//               className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
//             />
//             {errors.company && (
//               <p className='text-red-600 text-sm mt-1'>{errors.company}</p>
//             )}
//           </div>

//           {/* Start Date & End Date - Side by Side */}
//           <div className='grid grid-cols-2 gap-4 mb-4'>
//             {/* Start Date */}
//             <div>
//               <label className='block mb-2 font-semibold'>Start Date:</label>
//               <input
//                 type='date'
//                 name='startDate'
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
//               />
//               {errors.startDate && (
//                 <p className='text-red-600 text-sm mt-1'>{errors.startDate}</p>
//               )}
//             </div>

//             {/* End Date */}
//             <div>
//               <label className='block mb-2 font-semibold'>End Date:</label>
//               <input
//                 type='date'
//                 name='endDate'
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
//               />
//               {errors.endDate && (
//                 <p className='text-red-600 text-sm mt-1'>{errors.endDate}</p>
//               )}
//             </div>
//           </div>

//           {/* Designation */}
//           <div className='mb-4'>
//             <label className='block mb-2 font-semibold'>Designation:</label>
//             <input
//               type='text'
//               name='designation'
//               value={formData.designation}
//               onChange={handleChange}
//               className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
//             />
//             {errors.designation && (
//               <p className='text-red-600 text-sm mt-1'>{errors.designation}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type='submit'
//             className='bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-md w-1/5 font-semibold transition duration-300 outline-none'
//           >
//             Add Experience
//           </button>
//         </form>
//       </div>
//       {experienceData.length > 0 && (
//         <div className='w-[100%] border border-gray-300 m-auto mt-4 bg-white p-4 rounded-lg'>
//           <div className='text-gray-700 text-lg font-bold bg-white'>
//             <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
//               <span className='w-35'>Company</span>
//               <span className='w-35'>Start Date</span>
//               <span className='w-35'>End Date</span>
//               <span className='w-35'>Designation</span>
//               <span className='w-35'>Total Experience</span>
//               <span className='w-35'></span>
//             </div>
//           </div>

//           <div className='overflow-x-auto'>
//             {experienceData.map((exp, index) => (
//               <div
//                 key={index}
//                 className='flex justify-between items-center p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
//               >
//                 <span className='w-35'>{exp.company}</span>
//                 <span className='w-35'>{exp.startDate}</span>
//                 <span className='w-35'>{exp.endDate}</span>
//                 <span className='w-35'>{exp.designation}</span>
//                 <span className='w-35 font-semibold'>
//                   {exp.totalExperience}
//                 </span>
//                 <span className='flex space-x-2 w-35'>
//                   <FaRegPenToSquare className='w-4.5 h-4'   onClick={() => handleEdit(index)} />
//                   <RiDeleteBin6Line className='w-4.5 h-4' onClick={() => handleDelete(index)} />
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrainerExperienceForm;

/** @format */

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

export const TrainerExperienceForm = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    startDate: "",
    endDate: "",
    designation: "",
  });
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

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

    if (editingIndex !== null) {
      const updatedExperience = [...experienceData];
      updatedExperience[editingIndex] = { ...formData, totalExperience };
      setExperienceData(updatedExperience);
      setEditingIndex(null);
    } else {
      setExperienceData([...experienceData, { ...formData, totalExperience }]);
    }

    setFormData({ company: "", startDate: "", endDate: "", designation: "" });
    setErrors({});
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(experienceData[index]);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      setExperienceData(experienceData.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='flex flex-col items-center p-8 bg-gray-100 rounded-2xl text-white'>
      <div className='px-6 py-4 rounded-lg w-full max-w-5xl -mt-8 bg-white shadow-lg'>
        <h2 className='text-2xl font-bold mb-5 text-black text-center'>
          Trainer Experience Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg w-full text-gray-900'
        >
          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>Company Name:</label>
            <input
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
              className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.company && (
              <p className='text-red-600 text-sm mt-1'>{errors.company}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block mb-2 font-semibold'>Start Date:</label>
              <input
                type='date'
                name='startDate'
                value={formData.startDate}
                onChange={handleChange}
                className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
              />
              {errors.startDate && (
                <p className='text-red-600 text-sm mt-1'>{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className='block mb-2 font-semibold'>End Date:</label>
              <input
                type='date'
                name='endDate'
                value={formData.endDate}
                onChange={handleChange}
                className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
              />
              {errors.endDate && (
                <p className='text-red-600 text-sm mt-1'>{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-semibold'>Designation:</label>
            <input
              type='text'
              name='designation'
              value={formData.designation}
              onChange={handleChange}
              className='w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-600'
            />
            {errors.designation && (
              <p className='text-red-600 text-sm mt-1'>{errors.designation}</p>
            )}
          </div>

          <button
            type='submit'
            className='bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-md w-1/5 font-semibold transition duration-300 outline-none'
          >
            {editingIndex !== null ? "Update Experience" : "Add Experience"}
          </button>
        </form>
      </div>
      {experienceData.length > 0 && (
        <div className='w-[100%] border border-gray-300 m-auto mt-4 bg-white p-4 rounded-lg'>
          <div className='text-gray-700 text-lg font-bold bg-white'>
            <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
              <span className='w-35'>Company</span>
              <span className='w-35'>Start Date</span>
              <span className='w-35'>End Date</span>
              <span className='w-35'>Designation</span>
              <span className='w-35'>Total Experience</span>
              <span className='w-35'></span>
            </div>
          </div>

          <div className='overflow-x-auto'>
            {experienceData.map((exp, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
              >
                <span className='w-35'>{exp.company}</span>
                <span className='w-35'>{exp.startDate}</span>
                <span className='w-35'>{exp.endDate}</span>
                <span className='w-35'>{exp.designation}</span>
                <span className='w-35 font-semibold'>
                  {exp.totalExperience}
                </span>
                <span className='flex space-x-2 w-35'>
                  <FaRegPenToSquare className='w-4.5 h-4 cursor-pointer text-blue-500' onClick={() => handleEdit(index)} />
                  <RiDeleteBin6Line className='w-4.5 h-4 cursor-pointer text-red-500' onClick={() => handleDelete(index)} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerExperienceForm;
