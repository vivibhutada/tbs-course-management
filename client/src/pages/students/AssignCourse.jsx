"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

const AssignCourse = () => {
  const courses = [
    { title: "Course 1", fees: 60000 },
    { title: "Course 2", fees: 50000 },
    { title: "Course 3", fees: 40000 },
    { title: "Course 4", fees: 35000 },
    { title: "Course 5", fees: 25000 },
  ];

  const [selectedCourse, setSelectedCourse] = useState(""); // Stores selected course
  const [courseFee, setCourseFee] = useState(); // Stores the course fee dynamically
  const [discount, setDiscount] = useState();
  const [payAmount, setPayAmount] = useState();
  const [payableAmount, setPayableAmount] = useState();
  const [balanceAmount, setBalanceAmount] = useState();
  const [paymentMode, setPaymentMode] = useState("");
  const [courseDetails, setCourseDetails] = useState([]);

  const router = useRouter();

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);

    const selected = courses.find((course) => course.title === courseName);
    if (selected) {
      setCourseFee(selected.fees);
      setPayAmount(selected.fees - discount); // Auto-calculate pay amount
    } else {
      setCourseFee(0);
      setPayAmount(0);
    }
  };

  // Handle discount change and update pay amount
  const handleDiscountChange = (e) => {
    const discountValue = Number(e.target.value);
    setDiscount(discountValue);

    // Ensure the discount doesn't exceed course fees
    const updatedPayAmount = Math.max(courseFee - discountValue, 0);
    setPayAmount(updatedPayAmount);
    setBalanceAmount(updatedPayAmount - payableAmount);
  };

  // Handle payable amount change and update balance amount
  const handlePayableAmountChange = (e) => {
    const payable = Number(e.target.value);
    setPayableAmount(payable);
    setBalanceAmount(payAmount - payable);
  };

  const handleAssignedCourse = () => {
    router.push("/students");
  };

  return (
    <div className='w-full h-full pt-2 flex flex-col gap-5 font-["Poppins"]'>
      <div className="flex flex-row justify-between pb-2">
        {/* assign course heading */}
        <h3 className="font-semibold text-2xl text-gray-800 ps-2">
          Students &gt; Assign Course
        </h3>
      </div>
      <div className="w-full h-full px-6 py-6 bg-white flex flex-row justify-between gap-3 rounded-xl shadow-md">
        <form className="w-full">
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-row gap-5">
              <div className="w-2/5 flex flex-col gap-2">
                <label htmlFor="course" className="text-gray-800">
                  Choose course
                </label>
                <select
                  id="course"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                >
                  <option value="">Select a course</option>
                  {courses.map((course, courseIndex) => (
                    <option key={courseIndex} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/5 flex flex-col gap-2">
                <label htmlFor="course_fees" className="text-gray-800">
                  Course Fees
                </label>
                <input
                  type="number"
                  id="course_fees"
                  value={courseFee}
                  placeholder="50000"
                  readOnly
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500  rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              {/* readonly field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="disc_amt" className="text-gray-800">
                  Discount Amount
                </label>
                <input
                  type="number"
                  id="disc_amt"
                  value={discount}
                  placeholder="5000"
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                  onChange={handleDiscountChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pay_amt" className="text-gray-800">
                  Pay Amount
                </label>
                <input
                  type="number"
                  id="pay_amt"
                  value={payAmount}
                  placeholder="45000"
                  readOnly
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500 bg-gray-50 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 ps-1">
                <label htmlFor="payable_amt" className="text-gray-800">
                  Payable Amount
                </label>
                <input
                  type="number"
                  id="payable_amt"
                  value={payableAmount}
                  placeholder="45000"
                  className="w-1/3 px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                  onChange={() => {
                    handlePayableAmountChange();
                  }}
                />
              </div>
            </div>

            {/* mode of payment */}
            <div className="w-1/5 flex flex-col gap-2">
              <p className="text-gray-800">Mode of Payment</p>
              <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-1">
                  <input
                    type="radio"
                    id="cash"
                    name="mode_of_payment"
                    className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                    onChange={() => setPaymentMode("cash")}
                  />
                  <label htmlFor="cash" className="text-gray-800">
                    Cash
                  </label>
                </div>
                <div className="flex flex-row gap-1">
                  <input
                    type="radio"
                    id="online"
                    name="mode_of_payment"
                    className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                    onChange={() => setPaymentMode("online")}
                  />
                  <label htmlFor="online" className="text-gray-800">
                    Online
                  </label>
                </div>
                <div className="flex flex-row gap-1">
                  <input
                    type="radio"
                    id="cheque"
                    name="mode_of_payment"
                    className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                    onChange={() => setPaymentMode("cheque")}
                  />
                  <label htmlFor="cheque" className="text-gray-800">
                    Cheque
                  </label>
                </div>
              </div>
            </div>

            {/* Transaction Details (Only for Cheque & Online) */}
            {paymentMode === "online" && (
              <div className="w-2/5 flex flex-col gap-2">
                <label htmlFor="transaction_id" className="text-gray-800">
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="transaction_id"
                  placeholder="Enter Transaction ID"
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                />
              </div>
            )}
            {paymentMode === "cheque" && (
              <div className="w-2/5 flex flex-col gap-2">
                <label htmlFor="cheque_number" className="text-gray-800">
                  Cheque Number
                </label>
                <input
                  type="text"
                  id="cheque_number"
                  placeholder="Enter Cheque Number"
                  className="px-3 py-2 border-2 border-gray-300 text-gray-500 rounded-lg focus:outline-none"
                />
              </div>
            )}

            <div className="w-full flex flex-col gap-2">
              {/* readonly field */}
              <div className="w-full flex flex-1 flex-col gap-2 ps-1">
                <label htmlFor="bal_amt" className="text-gray-800">
                  Balance Amount
                </label>
                <input
                  type="number"
                  id="bal_amt"
                  value={balanceAmount}
                  placeholder="45000"
                  readOnly
                  className="w-1/3 px-3 py-2 border-2 border-gray-300 text-gray-500 bg-gray-50 rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-row py-8">
              <button
                onClick={handleAssignedCourse}
                type="button"
                className="flex flex-row items-center gap-1 ps-3 pe-2 py-2 bg-[rgb(11,64,41)] text-white text-sm font-semibold rounded-lg"
              >
                Continue <RiArrowRightSLine fontSize={21} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignCourse;
