/** @format */

// /** @format */

// // /** @format */

// "use client";

// import Link from "next/link";
// import { useState } from "react";

// const countries = ["India", "USA", "Canada"];
// const states = {
//   India: ["Maharashtra", "Telangana", "Karnataka"],
//   USA: ["California", "Texas", "Florida"],
//   Canada: ["Ontario", "Quebec", "British Columbia"],
// };
// const cities = {
//   Maharashtra: ["Mumbai", "Pune"],
//   Telangana: ["Hyderabad", "Warangal"],
//   Karnataka: ["Bangalore", "Mysore"],
//   California: ["Los Angeles", "San Francisco"],
//   Texas: ["Houston", "Austin"],
//   Florida: ["Miami", "Orlando"],
//   Ontario: ["Toronto", "Ottawa"],
//   Quebec: ["Montreal", "Quebec City"],
//   BritishColumbia: ["Vancouver", "Victoria"],
// };
// import { FaRegPenToSquare } from "react-icons/fa6";
// import { RiDeleteBin6Line } from "react-icons/ri";

// let programmes = [
//   {
//     course: "mern stack",
//     duration: "7 months",
//     mode: "online",
//     fees: "₹50000",
//     courseType: "paid",
//   },
//   {
//     course: "full stack development",
//     duration: "6 months",
//     mode: "online",
//     fees: "₹45000",
//     courseType: "paid",
//   },
//   {
//     course: "data science",
//     duration: "9 months",
//     mode: "hybrid",
//     fees: "₹60000",
//     courseType: "paid",
//   },
//   {
//     course: "cyber security",
//     duration: "8 months",
//     mode: "offline",
//     fees: "₹55000",
//     courseType: "paid",
//   },
//   {
//     course: "UI/UX design",
//     duration: "5 months",
//     mode: "online",
//     fees: "₹0",
//     courseType: "free",
//   },
// ];

// const PersonalInformation = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     country: "",
//     state: "",
//     city: "",
//     address: "",
//     pinCode: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Reset state and city when country changes
//     if (name === "country") {
//       setFormData({ ...formData, country: value, state: "", city: "" });
//     }
//     if (name === "state") {
//       setFormData({ ...formData, state: value, city: "" });
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email))
//       newErrors.email = "Enter a valid email";
//     if (!/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode))
//       newErrors.pinCode = "Enter a valid 6-digit PIN code";
//     if (!formData.country) newErrors.country = "Please select a country";
//     if (!formData.state) newErrors.state = "Please select a state";
//     if (!formData.city) newErrors.city = "Please select a city";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Submitted Data:", formData);
//       alert("Form submitted successfully!");
//     }
//   };

//   return (
//     <>
//       <div className='flex w-full justify-center bg-gray-100 p-5'>
//         <div className='w-full -mt-4 bg-white p-6 rounded-lg shadow-lg'>
//           <h2 className='text-3xl font-bold text-left mb-8 text-gray-800'>
//             Personal Information
//           </h2>
//           <form onSubmit={handleSubmit} className='space-y-5'>
//             {/* First Name & Last Name */}
//             <div className='grid grid-cols-2 gap-4'>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   First Name
//                 </label>
//                 <input
//                   type='text'
//                   name='firstName'
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 />
//                 {errors.firstName && (
//                   <p className='text-red-500 text-sm'>{errors.firstName}</p>
//                 )}
//               </div>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   Last Name
//                 </label>
//                 <input
//                   type='text'
//                   name='lastName'
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 />
//                 {errors.lastName && (
//                   <p className='text-red-500 text-sm'>{errors.lastName}</p>
//                 )}
//               </div>
//             </div>

//             {/* Email & Phone */}
//             <div className='grid grid-cols-2 gap-4'>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   Email
//                 </label>
//                 <input
//                   type='email'
//                   name='email'
//                   value={formData.email}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 />
//                 {errors.email && (
//                   <p className='text-red-500 text-sm'>{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   Phone
//                 </label>
//                 <input
//                   type='text'
//                   name='phone'
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 />
//                 {errors.phone && (
//                   <p className='text-red-500 text-sm'>{errors.phone}</p>
//                 )}
//               </div>
//             </div>

//             {/* Address & PIN Code */}
//             <div>
//               <label className='block font-medium mb-2 text-gray-700'>
//                 Address
//               </label>
//               <textarea
//                 name='address'
//                 value={formData.address}
//                 onChange={handleChange}
//                 className='w-full p-3 border rounded-lg'
//               ></textarea>
//               {errors.address && (
//                 <p className='text-red-500 text-sm'>{errors.address}</p>
//               )}
//             </div>
//             <div>
//               <label className='block font-medium mb-2 text-gray-700'>
//                 PIN Code
//               </label>
//               <input
//                 type='text'
//                 name='pinCode'
//                 value={formData.pinCode}
//                 onChange={handleChange}
//                 className='w-full p-3 border rounded-lg'
//               />
//               {errors.pinCode && (
//                 <p className='text-red-500 text-sm'>{errors.pinCode}</p>
//               )}
//             </div>

//             {/* Country, State, City */}
//             <div className='grid grid-cols-3 gap-4'>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   Country
//                 </label>
//                 <select
//                   name='country'
//                   value={formData.country}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 >
//                   <option value=''>Select Country</option>
//                   {countries.map((country) => (
//                     <option key={country} value={country}>
//                       {country}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.country && (
//                   <p className='text-red-500 text-sm'>{errors.country}</p>
//                 )}
//               </div>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   State
//                 </label>
//                 <select
//                   name='state'
//                   value={formData.state}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 >
//                   <option value=''>Select State</option>
//                   {states[formData.country]?.map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.state && (
//                   <p className='text-red-500 text-sm'>{errors.state}</p>
//                 )}
//               </div>
//               <div>
//                 <label className='block font-medium mb-2 text-gray-700'>
//                   City
//                 </label>
//                 <select
//                   name='city'
//                   value={formData.city}
//                   onChange={handleChange}
//                   className='w-full p-3 border rounded-lg'
//                 >
//                   <option value=''>Select City</option>
//                   {cities[formData.state]?.map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.city && (
//                   <p className='text-red-500 text-sm'>{errors.city}</p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Link href='/trainers/qualification'>
//               <button
//                 type='submit'
//                 className='w-1/5 py-3 text-white font-bold rounded-lg shadow-md
//          bg-gradient-to-r from-green-500 to-green-700 hover:scale-95 cursor-pointer transition-all duration-200'
//               >
//                 Continue →
//               </button>
//             </Link>
//           </form>
//         </div>
//       </div>
//       <div className='w-[96%] border border-gray-300 m-auto  bg-white p-4 rounded-lg'>
//         {/* <p className="w-34 text-gray-600 rounded-4xl text-center -mt-7 bg-white">Programmes offered</p> */}
//         <div className='text-gray-700 text-lg font-bold bg-white'>
//           <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
//             <span className='w-35'>Course</span>
//             <span className='w-35'>Duration</span>
//             <span className='w-35'>mode</span>
//             <span className='w-35'>courseType</span>
//             <span className='w-35'>fees</span>
//             <Link href='/trainers/loginpage'>
//               <button className='w-35 bg-green-700 text-white rounded-2xl py-2'>
//                 + Add{" "}
//               </button>
//             </Link>
//           </div>
//         </div>
//         {programmes.map((prog, index) => (
//           <div
//             key={index}
//             className='flex justify-between items-center  p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
//           >
//             <span className='w-35 '>{prog.course}</span>
//             <span className='w-35 '>{prog.duration}</span>
//             <span className='w-35 '>{prog.mode}</span>
//             <span className='w-35 '>{prog.courseType}</span>
//             <span className='w-35 '>{prog.fees}</span>
//             <span className='flex space-x-2 w-35 '>
//               <FaRegPenToSquare className='w-4.5 h-4' />
//               <RiDeleteBin6Line className='w-4.5 h-4' />
//             </span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PersonalInformation;

// /** @format */

"use client";

import Link from "next/link";
import { useState } from "react";

const countries = ["India", "USA", "Canada"];
const states = {
  India: ["Maharashtra", "Telangana", "Karnataka"],
  USA: ["California", "Texas", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
};
const cities = {
  Maharashtra: ["Mumbai", "Pune"],
  Telangana: ["Hyderabad", "Warangal"],
  Karnataka: ["Bangalore", "Mysore"],
  California: ["Los Angeles", "San Francisco"],
  Texas: ["Houston", "Austin"],
  Florida: ["Miami", "Orlando"],
  Ontario: ["Toronto", "Ottawa"],
  Quebec: ["Montreal", "Quebec City"],
  BritishColumbia: ["Vancouver", "Victoria"],
};
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

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

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});
  const [personalInfoList, setPersonalInfoList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset state and city when country changes
    if (name === "country") {
      setFormData({ ...formData, country: value, state: "", city: "" });
    }
    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" });
    }
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
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = "Enter a valid 6-digit PIN code";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.city) newErrors.city = "Please select a city";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formData);
      setPersonalInfoList([...personalInfoList, formData]);
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
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
                  className='w-full p-3 border rounded-lg'
                />
                {errors.firstName && (
                  <p className='text-red-500 text-sm'>{errors.firstName}</p>
                )}
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
                  className='w-full p-3 border rounded-lg'
                />
                {errors.lastName && (
                  <p className='text-red-500 text-sm'>{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
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
                  className='w-full p-3 border rounded-lg'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
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
                  className='w-full p-3 border rounded-lg'
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm'>{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address & PIN Code */}
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Address
              </label>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg'
              ></textarea>
              {errors.address && (
                <p className='text-red-500 text-sm'>{errors.address}</p>
              )}
            </div>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                PIN Code
              </label>
              <input
                type='text'
                name='pinCode'
                value={formData.pinCode}
                onChange={handleChange}
                className='w-full p-3 border rounded-lg'
              />
              {errors.pinCode && (
                <p className='text-red-500 text-sm'>{errors.pinCode}</p>
              )}
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
                  className='w-full p-3 border rounded-lg'
                >
                  <option value=''>Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className='text-red-500 text-sm'>{errors.country}</p>
                )}
              </div>
              <div>
                <label className='block font-medium mb-2 text-gray-700'>
                  State
                </label>
                <select
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  className='w-full p-3 border rounded-lg'
                >
                  <option value=''>Select State</option>
                  {states[formData.country]?.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className='text-red-500 text-sm'>{errors.state}</p>
                )}
              </div>
              <div>
                <label className='block font-medium mb-2 text-gray-700'>
                  City
                </label>
                <select
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='w-full p-3 border rounded-lg'
                >
                  <option value=''>Select City</option>
                  {cities[formData.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className='text-red-500 text-sm'>{errors.city}</p>
                )}
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                type='submit'
                className='w-1/6 py-3 text-white font-bold rounded-lg shadow-md 
    bg-gradient-to-r from-green-500 to-green-700 hover:scale-95 cursor-pointer transition-all duration-200'
              >
                Save →
              </button>

              <Link href='/trainers/qualification'>
                <button
                  type='submit'
                  className='w-[150%] py-3 text-white font-bold rounded-lg shadow-md 
         bg-gradient-to-r from-green-500 to-green-700 hover:scale-95 cursor-pointer transition-all duration-200'
                >
                  Continue →
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* <div className='w-[96%] border border-gray-300 m-auto  bg-white p-4 rounded-lg'>
        <div className='text-gray-700 text-lg font-bold bg-white'>
          <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
            <span className='w-20'>Name</span>
            <span className='w-20'>email</span>
            <span className='w-20'>Phone</span>
            <span className='w-20'>Address</span>
            <span className='w-22'>Pincode</span>
            <span className='w-25'>Country</span>
            <span className='w-18'>State</span>
            <span className='w-15'>City</span>
            <Link href='/trainers/loginpage'>
              <button className='w-25 bg-green-700 text-white rounded-2xl py-2'>
                + Add
              </button>
            </Link>
          </div>
        </div>

        {personalInfoList.map((info, index) => (
          <div
            key={index}
            className='flex justify-between items-center p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
          >
            <span className='w-20'>
              {info.firstName} {info.lastName}
            </span>
            <span className='w-20'>{info.email}</span>
            <span className='w-20'>{info.phone}</span>
            <span className='w-20'>{info.address}</span>
            <span className='w-20'>{info.pinCode}</span>
            <span className='w-20'>{info.country}</span>
            <span className='w-20'>{info.state}</span>
            <span className='w-20'>{info.city}</span>
            <span className='flex space-x-2 w-20'>
              <FaRegPenToSquare className='w-4.5 h-4' />
              <RiDeleteBin6Line className='w-4.5 h-4' />
            </span>
          </div>
        ))}
      </div> */}
      {personalInfoList.length > 0 && (
  <div className='w-[96%] border border-gray-300 m-auto bg-white p-4 rounded-lg'>
    <div className='text-gray-700 text-lg font-bold bg-white'>
      <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
        <span className='w-20'>Name</span>
        <span className='w-20'>Email</span>
        <span className='w-20'>Phone</span>
        <span className='w-20'>Address</span>
        <span className='w-22'>Pincode</span>
        <span className='w-25'>Country</span>
        <span className='w-18'>State</span>
        <span className='w-15'>City</span>
        <Link href='/trainers/loginpage'>
          <button className='w-25 bg-green-700 text-white rounded-2xl py-2'>
            + Add
          </button>
        </Link>
      </div>
    </div>

    {personalInfoList.map((info, index) => (
      <div
        key={index}
        className='flex justify-between items-center p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
      >
        <span className='w-20'>{info.firstName} {info.lastName}</span>
        <span className='w-20'>{info.email}</span>
        <span className='w-20'>{info.phone}</span>
        <span className='w-20'>{info.address}</span>
        <span className='w-20'>{info.pinCode}</span>
        <span className='w-20'>{info.country}</span>
        <span className='w-20'>{info.state}</span>
        <span className='w-20'>{info.city}</span>
        <span className='flex space-x-2 w-20'>
          <FaRegPenToSquare className='w-4.5 h-4' />
          <RiDeleteBin6Line className='w-4.5 h-4' />
        </span>
      </div>
    ))}
  </div>
)}

    </>
  );
};

export default PersonalInformation;
