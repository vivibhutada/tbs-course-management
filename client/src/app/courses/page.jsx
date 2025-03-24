"use client";

import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";

export default function CourseList() {
  const [programmes, setProgrammes] = useState([]);
  const [filteredProgrammes, setFilteredProgrammes] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    duration: "",
    mode: "",
    courseType: "",
    fees: "",
    certificate: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filters, setFilters] = useState({ search: "", duration: "", mode: "", courseType: "", sort: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "courseType") {
      setFormData((prev) => ({
        ...prev,
        courseType: value,
        fees: value === "Unpaid" ? "0" : prev.fees || "", // Keep fees field editable when selecting Paid
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProgrammes = editIndex !== null ? programmes.map((p, i) => (i === editIndex ? formData : p)) : [...programmes, formData];
    setProgrammes(updatedProgrammes);
    setFilteredProgrammes(updatedProgrammes);
    setEditIndex(null);
    setFormData({ course: "", duration: "", mode: "", courseType: "", fees: "", certificate: "" });
  };

  const handleDelete = (index) => {
    const updatedProgrammes = programmes.filter((_, i) => i !== index);
    setProgrammes(updatedProgrammes);
    setFilteredProgrammes(updatedProgrammes);
  };

  const handleEdit = (index) => {
    setFormData(programmes[index]);
    setEditIndex(index);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    filterAndSort({ ...filters, [name]: value });
  };

  const filterAndSort = (filterParams) => {
    let filtered = programmes.filter((p) =>
      (filterParams.search === "" || p.course.toLowerCase().includes(filterParams.search.toLowerCase())) &&
      (filterParams.duration === "" || p.duration === filterParams.duration) &&
      (filterParams.mode === "" || p.mode === filterParams.mode) &&
      (filterParams.courseType === "" || p.courseType === filterParams.courseType)
    );

    if (filterParams.sort === "asc") {
      filtered.sort((a, b) => parseFloat(a.fees) - parseFloat(b.fees));
    } else if (filterParams.sort === "desc") {
      filtered.sort((a, b) => parseFloat(b.fees) - parseFloat(a.fees));
    }

    setFilteredProgrammes(filtered);
  };


  const courses = ["python", "fullstack development", "frontend development"];
   const durations = ["3 months", "6 months", "9 months", "12 months"];
  const modes = ["Online", "Offline", "Hybrid"];
   const certificate = ["yes", "no"];

  return (
    <div className="w-[98%]">
      <div className="w-[100%] mx-auto mt-1 bg-white p-6 border border-gray-300  rounded-lg">
        <h2 className=" text-xl text-center font-semibold text-gray-700  bg-white mb-10  mt-5">
          Create Courses
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Course Selection */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Duration</option>
              {durations.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Mode
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Mode</option>
              {modes.map((mode, index) => (
                <option key={index} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          {/* Course Type Selection */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Type
            </label>
            <select
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Type</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          {/* Fees Input (Visible only for Paid Type) */}
          {formData.courseType === "Paid" && (
            <div>
              <label className="block text-gray-600 font-medium">
                Enter Fees
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Enter Fees"
                required
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          )}

          {/* certificate Selection */}
          <div>
            <label className="block text-gray-600 font-medium">
              certificate
            </label>
            <select
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">certificate</option>
              {certificate.map((certificate, index) => (
                <option key={index} value={certificate}>
                  {certificate}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 ">
            <button
              type="submit"
              className="bg-green-900 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              {editIndex !== null ? "Update Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-[100%] border border-gray-300 m-auto mt-5 bg-white p-4 rounded-lg">

        {/* <div className="flex justify-evenly border-2 border-amber-400">
          <p className=" text-gray-600 font-bold ml-3 mt-5 mb-10 bg-white border-2 border-amber-400">
            Courses List
          </p>

          <div className="flex justify-evenly items-center gap-2 p-3 bg-white rounded-lg mb-5 ml-30 border-2 border-amber-400">
            <div className="flex items-center gap-2 text-lg font-bold text-green-900 cursor-pointer">
              <CiFilter className="text-xl" />
              <span>Filter</span>
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search by courses"
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-64 focus:border-green-900 focus:outline-none"
            />
            <select
              name="duration"
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700"
            >
              <option value="">All Durations</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="6 months">9 months</option>
              <option value="6 months">12 months</option>
            </select>
            <select
              name="mode"
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700"
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select
              name="courseType"
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700"
            >
              <option value="">All Types</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <select
              name="sort"
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700"
            >
              <option value="">Sort by Fees</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div> */}

<div className="flex flex-col md:flex-row justify-evenly">
  <p className="text-gray-600 font-bold ml-3 mt-3 md:mt-5 mb-3 md:mb-10 bg-white  p-2 text-center md:text-left">
    Courses List
  </p>

  <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center gap-2 p-3 bg-white rounded-lg mb-5 w-full">
    <div className="flex items-center gap-2 text-lg font-bold text-green-900 cursor-pointer">
      <CiFilter className="text-xl" />
      <span>Filter</span>
    </div>
    <input
      type="text"
      name="search"
      placeholder="Search by courses"
      onChange={handleFilterChange}
      className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-full md:w-64 focus:border-green-900 focus:outline-none"
    />
    <select
      name="duration"
      onChange={handleFilterChange}
      className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-full md:w-auto"
    >
      <option value="">All Durations</option>
      <option value="3 months">3 months</option>
      <option value="6 months">6 months</option>
      <option value="9 months">9 months</option>
      <option value="12 months">12 months</option>
    </select>
    <select
      name="mode"
      onChange={handleFilterChange}
      className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-full md:w-auto"
    >
      <option value="">All Modes</option>
      <option value="Online">Online</option>
      <option value="Offline">Offline</option>
      <option value="Hybrid">Hybrid</option>
    </select>
    <select
      name="courseType"
      onChange={handleFilterChange}
      className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-full md:w-auto"
    >
      <option value="">All Types</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
    </select>
    <select
      name="sort"
      onChange={handleFilterChange}
      className="p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 w-full md:w-auto"
    >
      <option value="">Sort by Fees</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  </div>
</div>

        <div className="text-gray-700 text-lg font-bold bg-white">
          <div className="flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2">
            <span className="w-35">Courses</span>
            <span className="w-35">Duration</span>
            <span className="w-35">Mode</span>
            <span className="w-35">Course Type</span>
            <span className="w-35">Fees</span>
            <span className="w-35">certificate</span>
            <span className="w-35"></span>
          </div>
        </div>

        {filteredProgrammes.map((prog, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border border-gray-300 text-sm font-semibold text-gray-500 bg-gray-100 rounded mb-2 hover:bg-green-50"
          >
            <span className="w-35">{prog.course}</span>
            <span className="w-35">{prog.duration}</span>
            <span className="w-35">{prog.mode}</span>
            <span className="w-35">{prog.courseType}</span>
            <span className="w-35">₹ {prog.fees}</span>
            <span className="w-35">{prog.certificate}</span>
            <span className="flex space-x-2 w-35">
              <FaRegPenToSquare
                onClick={() => handleEdit(index)}
                className="cursor-pointer text-[18px]"
              />
              <RiDeleteBin6Line
                onClick={() => handleDelete(index)}
                className="cursor-pointer text-[18px]"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
