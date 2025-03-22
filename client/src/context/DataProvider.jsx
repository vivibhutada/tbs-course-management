"use client";

import React, { useState, createContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <DataContext.Provider value={{ sidebar, setSidebar}}>
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContext;
