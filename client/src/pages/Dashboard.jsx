"use client";

import React from "react";

const Dashboard = () => {

  return (
    <div className='w-full min-h-[50vw] h-auto pt-2 flex flex-col gap-5 font-["Poppins"]'>
      <div className="w-full h-[10vh] flex flex-col justify-start">
        <h3 className="font-semibold text-xl text-gray-900 ps-2">
          Welcome back Admin
        </h3>
        <p className="text-sm text-gray-500 ps-2">
          Last logged on 7<sup>th</sup> March
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
