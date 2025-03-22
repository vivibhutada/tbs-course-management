/** @format */

"use client";
import Link from "next/link";
import { useState } from "react";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    languages: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = "Enter a valid 6-digit PIN code";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className='flex w-full justify-center bg-gray-100 p-5'>
      <div className='w-full -mt-4 bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold text-left mb-8 text-gray-800'>
          Personal Information
        </h2>
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* First Name & Last Name */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none focus:ring-green-400 focus:border-green-500 transition-all duration-200'
              />
            </div>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none focus:ring-green-400 focus:border-green-500 transition-all duration-200'
              />
            </div>
          </div>
          {/* Email and phone */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none focus:ring-green-400 focus:border-green-500 transition-all duration-200'
              />
            </div>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Phone
              </label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none focus:ring-green-400 focus:border-green-500 transition-all duration-200'
              />
            </div>
          </div>
          {/* Languages Known */}
          <div>
            <label className='block font-medium mb-2 text-gray-700'>
              Languages Known
            </label>
            <input
              type='text'
              name='languages'
              value={formData.languages}
              onChange={handleChange}
              className='w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none focus:ring-green-400 focus:border-green-500 transition-all duration-200'
            />
          </div>

          {/* Country, State, City */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Country
              </label>
              <select
                name='country'
                value={formData.country}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-all duration-200'
              >
                <option value=''>Select Country</option>
                <option value='India'>India</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                State
              </label>
              <select
                name='state'
                value={formData.state}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-all duration-200'
              >
                <option value=''>Select State</option>
                <option value='Maharashtra'>Maharashtra</option>
                <option value='Telangana'>Telangana</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                City
              </label>
              <select
                name='city'
                value={formData.city}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-all duration-200'
              >
                <option value=''>Select City</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Hyderabad'>Hyderabad</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className='block font-medium mb-2 text-gray-700'>
              Address
            </label>
            <textarea
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full p-3 border rounded-lg shadow-sm focus:ring-1 focus:ring-green-400 focus:border-green-500 transition-all duration-200 outline-none'
            ></textarea>
          </div>

          {/* PIN Code */}
          <div>
            <label className='block font-medium mb-2 text-gray-700'>
              PIN Code
            </label>
            <input
              type='text'
              name='pinCode'
              value={formData.pinCode}
              onChange={handleChange}
              className='w-full p-3 border rounded-lg shadow-sm focus:ring-1 focus:ring-green-400 focus:border-green-500 transition-all duration-200 outline-none'
            />
          </div>

          {/* Submit Button */}
          <Link href='/trainers/qualification'>
          <button
            type='submit'
            className='w-full py-3 text-white font-bold rounded-lg shadow-md 
        bg-gradient-to-r from-green-500 to-green-700 hover:scale-95 cursor-pointer transition-all duration-200'
          >
            Continue →
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
