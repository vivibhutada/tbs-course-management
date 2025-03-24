"use client";

import React from "react";
import { PiStudent } from "react-icons/pi";
// import { GiGraduateCap } from "react-icons/gi";
import { IoIosEye } from "react-icons/io";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "NodeJS", students: 200 },
  { name: "ReactJS", students: 550 },
  { name: "MongoDB", students: 480 },
  { name: "PHP", students: 100 },
  { name: "Java", students: 450 },
  { name: "Python", students: 750 },
  { name: "NodeJS", students: 250 },
  { name: "ReactJS", students: 550 },
  { name: "MongoDB", students: 380 },
  { name: "PHP", students: 800 },
];

const Dashboard = () => {
  const tableData = [
    {
      "Sr. No.": 1,
      "Student name": "Rahul Sharma",
      Date: "19 Jun 2020",
      Amount: "₹50,000.00",
      Status: "Paid",
    },
    {
      "Sr. No.": 2,
      "Student name": "Rahul Sharma",
      Date: "19 Jun 2020",
      Amount: "₹50,000.00",
      Status: "Paid",
    },
    {
      "Sr. No.": 3,
      "Student name": "Rahul Sharma",
      Date: "19 Jun 2020",
      Amount: "₹50,000.00",
      Status: "Paid",
    },
    {
      "Sr. No.": 4,
      "Student name": "Rahul Sharma",
      Date: "19 Jun 2020",
      Amount: "₹50,000.00",
      Status: "Paid",
    },
    {
      "Sr. No.": 5,
      "Student name": "Rahul Sharma",
      Date: "19 Jun 2020",
      Amount: "₹50,000.00",
      Status: "Paid",
    },
  ];

  const headers = Object.keys(tableData[0]);

  return (
    <div className='w-full min-h-[50vw] h-auto pt-2 flex flex-col gap-5 font-["Poppins"]'>
      {/* welcome greeting */}
      <div className="w-full h-[8vh] flex flex-col justify-start">
        <h3 className="font-semibold text-xl text-gray-900 ps-2">
          Welcome back Admin
        </h3>
        <p className="text-sm text-gray-500 ps-2">
          Last logged on 7<sup>th</sup> March
        </p>
      </div>
      <div className="w-full flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-8/12 flex flex-col gap-5">
          {/* students, trainers, courses count */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-5">
            {/* students count */}
            <div className="w-full sm:w-2/3 md:w-1/3 px-4 py-6 bg-white flex flex-col justify-center items-center gap-3 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-200/20 to-blue-800/20 rounded flex flex-row justify-center items-center border-[0.001vw] border-blue-200">
                <PiStudent fontSize={36} className="text-[rgb(0,184,217)]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-5xl text-gray-700">0</p>
                <h4 className="text-md text-gray-500 font-light">Students</h4>
              </div>
            </div>
            {/* trainers count */}
            <div className="w-full sm:w-2/3 md:w-1/3 px-4 py-6 bg-white flex flex-col justify-center items-center gap-3 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-green-200/20 to-green-800/20 rounded flex flex-row justify-center items-center border-[0.001vw] border-green-200">
                <PiStudent fontSize={36} className="text-[rgb(54,179,126)]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-5xl text-gray-700">0</p>
                <h4 className="text-md text-gray-500 font-light">Trainers</h4>
              </div>
            </div>
            {/* courses count */}
            <div className="w-full sm:w-2/3 md:w-1/3 px-4 py-6 bg-white flex flex-col justify-center items-center gap-3 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-200/20 to-yellow-700/20 rounded flex flex-row justify-center items-center border-[0.001vw] border-yellow-200">
                <PiStudent fontSize={36} className="text-yellow-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-5xl text-gray-700">0</p>
                <h4 className="text-md text-gray-500 font-light">Courses</h4>
              </div>
            </div>
          </div>

          {/* today's payment details */}
          <div className="w-full px-6 pt-6 pb-3 bg-white flex flex-col justify-center rounded-lg shadow-md overflow-x-auto">
            <h4 className="font-bold text-2xl text-gray-900">
              Today's Payments
            </h4>
            <div className="w-full py-5">
              <table className="md:w-full text-sm lg:text-[0.8vw] font-medium text-left">
                <thead>
                  <tr className="border-y-2 border-gray-200">
                    {headers.map((head, headIndex) => (
                      <th
                        key={headIndex}
                        className="font-semibold text-gray-800 px-4 py-2"
                      >
                        {head}
                      </th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="px-4 py-2">{row["Sr. No."]}</td>
                      <td className="px-4 py-2">{row["Student name"]}</td>
                      <td className="px-4 py-2">{row.Date}</td>
                      <td className="px-4 py-2">{row.Amount}</td>
                      <td className="px-4 py-2">{row.Status}</td>
                      <td>
                        <button className="text-gray-800 cursor-pointer">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 pt-4 flex flex-row items-start">
                <Link
                  href={"/payments"}
                  className="cursor-pointer font-medium text-sm text-gray-800"
                >
                  View All &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* Students bar graph */}
          <div className="w-full">
            <div className="p-4 bg-white flex flex-col md:flex-row gap-4 md:gap-10 rounded-2xl shadow-md">
              <div className="w-full h-full">
                <ResponsiveContainer height={200}>
                  <BarChart
                    width={400}
                    height={200}
                    data={data}
                    margin={{ top: 20, right: 30, left: -50, bottom: 0 }}
                    barCategoryGap="25%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      horizontal={false}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={false} />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        borderRadius: "6px",
                        fontSize: "10px",
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#4a5565" }}
                      formatter={(value) => [
                        <span className="text-gray-500">{`Student s: ${value}`}</span>,
                      ]}
                    />
                    {/* <Legend /> */}
                    <Bar dataKey="students" fill="rgba(10,84,52,0.5)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* graph stats */}
              <div className="w-full md:w-2/5 flex flex-col gap-3 lg:gap-0 justify-between p-2">
                <div className="flex flex-row gap-2">
                  <div className="px-3 py-3 flex items-center bg-green-400 text-white rounded-lg inset-shadow-[0_5px_35px_rgb(0,0,0,0.4)]">
                    <IoIosEye fontSize={24} />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="text-sm lg:text-[0.7vw] text-gray-600 leading-none">
                      Total Students
                    </h4>
                    <p className="font-bold text-xl text-green-600 leading-none">
                      13052
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="px-3 py-3 flex items-center bg-gray-400 text-white rounded-lg inset-shadow-[0_5px_35px_rgb(0,0,0,0.4)]">
                    <IoIosEye fontSize={24} />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="text-sm lg:text-[0.7vw] text-gray-600 leading-none">
                      Trainers
                    </h4>
                    <p className="font-bold text-xl text-green-600 leading-none">
                      783
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="px-3 py-3 flex items-center bg-orange-400 text-white rounded-lg inset-shadow-[0_5px_35px_rgb(0,0,0,0.4)]">
                    <IoIosEye fontSize={24} />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="text-sm lg:text-[0.7vw] text-gray-600 leading-none">
                      Last 24 hrs
                    </h4>
                    <p className="font-bold text-xl text-green-600 leading-none">
                      69
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 flex flex-col">
          {/* current batches */}
          <div className="w-full px-6 py-4 bg-white flex flex-col justify-center gap-3 rounded-lg shadow-md">
            <h4 className="font-bold text-2xl text-gray-900">
              Current Batches
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-yellow-200 text-yellow-700 text-[0.8vw] rounded-md">
                  Inactive
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-yellow-200 text-yellow-700 text-[0.8vw] rounded-md">
                  Inactive
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-yellow-200 text-yellow-700 text-[0.8vw] rounded-md">
                  Inactive
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">Batch 1</p>
                  <p className="font-medium text-[0.7vw] text-gray-600">
                    Started on 7<sup>th</sup> March
                  </p>
                </div>
                <button className="w-1/5 px-3 py-2 bg-green-200 text-green-700 text-[0.8vw] rounded-md">
                  Active
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
