// "use client";

// import DataContext from "@/context/DataProvider";
// import React, { useContext } from "react";
// import { IoIosMenu } from "react-icons/io";

// const Navbar = () => {
//   const { sidebar, setSidebar } = useContext(DataContext);

//   return (
//     <div className="w-full h-full bg-white flex flex-row justify-between items-center px-6 py-5 shadow">
//       {/* logo */}
//       <div className="text-green-900">
//         <h1 className="text-4xl font-extrabold leading-none">courseMS</h1>
//         <h3 className="uppercase text-[0.6vw] text-end font-extrabold leading-none">The skills in you</h3>
//       </div>
//       {/* profile image */}
//       <div className="flex flex-1 flex-row items-center justify-end gap-3">
//         <div className="rounded-full w-14 h-14 bg-[url('/assets/profileImg.jpg')] bg-cover bg-top"></div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";

import DataContext from "@/context/DataProvider";
import React, { useContext } from "react";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const { sidebar, setSidebar } = useContext(DataContext);

  return (
    <div className="w-full h-full bg-white flex flex-row justify-between items-center px-6 py-5">
      {/* Menu Button for Mobile */}
      <button
        className="text-green-900 text-3xl cursor-pointer lg:hidden"
        onClick={() => setSidebar(true)}
      >
        <IoIosMenu />
      </button>

      {/* Logo */}
      <div className="text-green-900">
        <h1 className="text-2xl md:text-4xl font-extrabold leading-none">courseMS</h1>
        <h3 className="uppercase text-[0.6vw] text-end font-extrabold leading-none">
          The skills in you
        </h3>
      </div>

      {/* Profile Image */}
      <div className="flex flex-row items-center justify-end gap-3">
        <div className="rounded-full w-14 h-14 bg-[url('/assets/profileImg.jpg')] bg-cover bg-top"></div>
      </div>
    </div>
  );
};

export default Navbar;
