"use client";

import React, { useState, createContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  return (
    <>
      <DataContext.Provider
        value={{
          sidebar,
          setSidebar,
          students,
          setStudents,
          editIndex,
          setEditIndex,
          selectedCountry,
          setSelectedCountry,
          selectedState,
          setSelectedState,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContext;
