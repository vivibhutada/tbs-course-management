"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


export const PersonalInformation = () => {

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  address: yup.string().required("Address is required"),
  pinCode: yup
    .string()
    .matches(/^\d{6}$/, "Pin Code must be 6 digits")
    .required("Pin Code is required"),
  country: yup.string().required("Please select a country"),
  state: yup.string().required("Please select a state"),
  city: yup.string().required("Please select a city"),
});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    country: "",
    state: "",
    city: "",
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [personalInfoList, setPersonalInfoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const countries = ["USA", "India", "UK"];
  const states = {
    USA: ["California", "Texas"],
    India: ["Maharashtra", "Delhi"],
    UK: ["London", "Manchester"],
  };
  const cities = {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
    Maharashtra: ["Mumbai", "Pune"],
    Delhi: ["New Delhi", "Noida"],
    London: ["Camden", "Westminster"],
    Manchester: ["Salford", "Bolton"],
  };

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedList = [...personalInfoList];
      updatedList[editIndex] = data;
      setPersonalInfoList(updatedList);
      setEditIndex(null);
    } else {
      setPersonalInfoList([...personalInfoList, data]);
    }
    setShowForm(false);
    reset();
  };

  const handleEdit = (index) => {
    const selectedData = personalInfoList[index];
    for (const key in selectedData) {
      setValue(key, selectedData[key]);
    }
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedList = personalInfoList.filter((_, i) => i !== index);
      setPersonalInfoList(updatedList);
    }
  };

  return (
    <div className="w-full p-5 bg-gray-100">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800">Trainer List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-green-700 rounded-lg hover:scale-95 transition-all"
        >
          Add +
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mt-5">
        {personalInfoList.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Country</th>
                <th className="p-2 border">State</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Pincode</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {personalInfoList.map((info, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border">
                    {info.firstName} {info.lastName}
                  </td>
                  <td className="p-2 border">{info.email}</td>
                  <td className="p-2 border">{info.phone}</td>
                  <td className="p-2 border">{info.address}</td>
                  <td className="p-2 border">{info.country}</td>
                  <td className="p-2 border">{info.state}</td>
                  <td className="p-2 border">{info.city}</td>
                  <td className="p-2 border">{info.pinCode}</td>
                  <td className="p-2 flex gap-2">
                    <FaRegPenToSquare
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEdit(index)}
                    />
                    <RiDeleteBin6Line
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No records found.</p>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mt-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editIndex !== null ? "Edit" : "Add"} Personal Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 ">
              {/*  */}
              
              {/*  */}
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                className="border p-2 w-full rounded mb-2"
              />
              <input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="border p-2 w-full rounded mb-2"
              />
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="border p-2 w-full rounded mb-2"
              />
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Phone"
                className="border p-2 w-full rounded mb-2"
              />
              </div>
            <div className="grid grid-cols-3 gap-4">
              <select
                {...register("country", {
                  required: "Please select a country",
                })}
                className="border p-2 w-full rounded mb-2"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                {...register("state", { required: "Please select a state" })}
                className="border p-2 w-full rounded mb-2"
              >
                <option value="">Select State</option>
                {selectedCountry &&
                  states[selectedCountry]?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
              <select
                {...register("city", { required: "Please select a city" })}
                className="border p-2 w-full rounded mb-2"
              >
                <option value="">Select City</option>
                {selectedState &&
                  cities[selectedState]?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <textarea
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="border p-2 w-full rounded mb-2"
              ></textarea>
              <input
                {...register("pinCode", { required: "Pin Code is required" })}
                placeholder="Pin Code"
                className="border p-2 w-full rounded mb-2"
              />
            <button
              type="submit"
              className="w-1/8 mt-3 py-3 text-white bg-green-700 rounded-lg "
            >
              {editIndex !== null ? "Update" : "Save"} →
            </button>
          </form>
        </div>
      )}

      {personalInfoList.length > 0 && (
        <button
          onClick={() => router.push("/trainers/qualification")}
          className="w-1/5 py-3 mt-5 text-white bg-green-700 rounded-lg hover:scale-95 transition"
        >
          Continue →
        </button>
      )}
    </div>
  );
};

export default PersonalInformation;
