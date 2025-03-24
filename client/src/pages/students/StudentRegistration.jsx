"use client";

import DataContext from "@/context/DataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";

// Static data for dropdowns
const countries = ["USA", "Canada", "India"];
const statesByCountry = {
  USA: ["California", "Texas", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  India: ["Maharashtra", "Karnataka", "Tamil Nadu"],
};
const citiesByState = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  Ontario: ["Toronto", "Ottawa", "Mississauga"],
  Quebec: ["Montreal", "Quebec City", "Laval"],
  "British Columbia": ["Vancouver", "Victoria", "Surrey"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
};

const StudentRegistration = () => {
  const { students, setStudents } = useContext(DataContext);
  const { editIndex, setEditIndex } = useContext(DataContext); // Track the student being edited
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const { selectedCountry, setSelectedCountry } = useContext(DataContext);
  const { selectedState, setSelectedState } = useContext(DataContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRedirect = () => {
    router.push("/students"); // Redirect to another page
  };

  const onSubmit = (data) => {
    if (editIndex !== null) {
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { ...updatedStudents[editIndex], ...data };
      setStudents(updatedStudents);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new student
      setStudents([...students, data]);
    }
    reset(); // Reset the form after submission

    // setShowForm(false); // Hide the form after saving
    handleRedirect();
  };

  return (
    <div className='w-full h-full pt-2 flex flex-col gap-5 font-["Poppins"]'>
      <div className="flex flex-row justify-between pb-2">
        {/* students heading */}
        <h3 className="font-semibold text-2xl text-gray-800 ps-2">
          Students &gt; Personal Information
        </h3>
      </div>
      {/* Enrollment Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Gender and Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Gender */}
          <div>
            <label className="block text-gray-600 mb-1">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full px-3 py-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full px-3 py-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number and Alternate Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Alternate Number */}
          <div>
            <label className="block text-gray-600 mb-1">
              Alternate Number
            </label>
            <input
              type="tel"
              placeholder="Alternate Number"
              {...register("alternateNumber")}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Email and Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Father's Name and Occupation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Father's Name */}
          <div>
            <label className="block text-gray-600 mb-1">
              Father's Name
            </label>
            <input
              type="text"
              placeholder="Father's Name"
              {...register("fathersName", {
                required: "Father's Name is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.fathersName && (
              <p className="text-red-500 text-sm">
                {errors.fathersName.message}
              </p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-gray-600 mb-1">Occupation</label>
            <input
              type="text"
              placeholder="Occupation"
              {...register("occupation", {
                required: "Occupation is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm">
                {errors.occupation.message}
              </p>
            )}
          </div>
        </div>

        {/* Country, State, and City Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Country */}
          <div>
            <label className="block text-gray-600 mb-1">Country</label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full px-3 py-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState(""); // Reset state when country changes
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-600 mb-1">State</label>
            <select
              {...register("state", { required: "State is required" })}
              className="w-full px-3 py-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {selectedCountry &&
                statesByCountry[selectedCountry]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-600 mb-1">City</label>
            <select
              {...register("city", { required: "City is required" })}
              className="w-full px-3 py-3 border border-gray-300 text-gray-500 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {selectedState &&
                citiesByState[selectedState]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Pincode and Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Address */}
          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <textarea
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
              rows="3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-600 mb-1">Pincode</label>
            <input
              type="text"
              placeholder="Pincode"
              {...register("pincode", { required: "Pincode is required" })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none hover:bg-green-50 transition-colors duration-200"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-900 text-white px-3 py-2 rounded-md flex flex-row items-center gap-1"
        >
          {editIndex !== null ? "Update" : "Submit"} <IoIosArrowForward />
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
