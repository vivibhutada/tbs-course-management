"use client";

import React, { useState, createContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [studentsData, setStudentsData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);

  return (
    <>
      <DataContext.Provider
        value={{
          sidebar,
          setSidebar,
          studentsData,
          setStudentsData,
          editIndex,
          setEditIndex,
          selectedCountry,
          setSelectedCountry,
          selectedState,
          setSelectedState,
          batches,
          setBatches,
          students,
          setStudents,
          trainers,
          setTrainers,
          studentStatus,
          setStudentStatus
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContext;
