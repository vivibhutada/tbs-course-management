/** @format */

"use client";

import Link from "next/link";
import React from "react";
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

export default function CourseList() {
  return (
    <div className='w-[98%] border border-gray-300 m-auto  bg-white p-4 rounded-lg'>
      {/* <p className="w-34 text-gray-600 rounded-4xl text-center -mt-7 bg-white">Programmes offered</p> */}
      <div className='text-gray-700 text-lg font-bold bg-white'>
        <div className='flex justify-between items-center p-3 text-base text-gray-600 rounded mb-2'>
          <span className='w-35'>Course</span>
          <span className='w-35'>Duration</span>
          <span className='w-35'>mode</span>
          <span className='w-35'>courseType</span>
          <span className='w-35'>fees</span>
          <Link href='/trainers/loginpage'>
            <button className='w-35 bg-green-700 text-white rounded-2xl py-2'>+ Add </button>
          </Link>
        </div>
      </div>
      {programmes.map((prog, index) => (
        <div
          key={index}
          className='flex justify-between items-center  p-3 border border-gray-200 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-green-50 rounded mb-2'
        >
          <span className='w-35 '>{prog.course}</span>
          <span className='w-35 '>{prog.duration}</span>
          <span className='w-35 '>{prog.mode}</span>
          <span className='w-35 '>{prog.courseType}</span>
          <span className='w-35 '>{prog.fees}</span>
          <span className='flex space-x-2 w-35 '>
            <FaRegPenToSquare className='w-4.5 h-4' />
            <RiDeleteBin6Line className='w-4.5 h-4' />
          </span>
        </div>
      ))}
    </div>
  );
}
