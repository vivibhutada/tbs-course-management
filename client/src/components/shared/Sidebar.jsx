// "use client";

// import Link from "next/link";
// import React, { useContext } from "react";
// import { usePathname } from "next/navigation";
// import { SIDEBAR_LINKS } from "@/lib/consts/navigation";
// import DataContext from "@/context/DataProvider";

// const Sidebar = () => {
//   const pathname = usePathname();
//   const { sidebar } = useContext(DataContext);

//   return (
//     <>
//       <div className="w-full h-full bg-gradient-to-b from-green-800 to-green-950 rounded-xl flex flex-col justify-start items-start gap-5 font-['Poppins']">
//         {/* Sidebar Links */}
//         <div className="w-full p-4 flex flex-col gap-0.5 text-sm">
//           {SIDEBAR_LINKS.map((mainLink, mainLinkIndex) => {
//             const isActive = pathname.startsWith(mainLink.path);

//             return (<Link
//               key={mainLinkIndex}
//               href={mainLink.path}
//               prefetch={true}
//               className={`flex flex-row items-center gap-3 rounded p-3 font-light focus:outline-none ${
//                     isActive
//                       ? "font-semibold text-[rgba(255,255,255,1)]"
//                       : "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]"
//                   }`}
//             >
//               {mainLink.icon}
//               {mainLink.title}
//             </Link>)
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/lib/consts/navigation";
import DataContext from "@/context/DataProvider";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const pathname = usePathname();
  const { sidebar, setSidebar } = useContext(DataContext);

  return (
    <>
      {/* Desktop Sidebar (Always Visible) */}
      <div className={`w-1/6 ps-3 py-3 lg:block ${sidebar ? "flex" : "hidden"}`}>
        <div className="w-full h-full bg-gradient-to-b from-green-800 to-green-950 rounded-xl flex flex-col justify-start items-start gap-5 font-['Poppins']">
          <div className="w-full p-4 flex flex-col gap-0.5 text-sm">
            {SIDEBAR_LINKS.map((mainLink, mainLinkIndex) => {
              const isActive = pathname.startsWith(mainLink.path);

              return (
                <Link
                  key={mainLinkIndex}
                  href={mainLink.path}
                  prefetch={true}
                  className={`flex flex-row items-center gap-3 rounded p-3 font-light focus:outline-none ${
                    isActive
                      ? "font-semibold text-[rgba(255,255,255,1)]"
                      : "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]"
                  }`}
                >
                  {mainLink.icon}
                  {mainLink.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Sidebar (Hidden by Default) */}
        <div
          className={`fixed top-0 left-0 w-[70%] max-w-[280px] h-full bg-gradient-to-b from-green-800 to-green-950 rounded-r-xl flex flex-col p-4 shadow-lg transition-transform duration-300 z-50 ${
            sidebar ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <button
            onClick={() => setSidebar(false)}
            className="text-[rgba(255,255,255,0.6)] text-2xl self-end mb-4"
          >
            <RxCross2 />
          </button>
          {SIDEBAR_LINKS.map((mainLink, mainLinkIndex) => {
            const isActive = pathname.startsWith(mainLink.path);

            return (
              <Link
                key={mainLinkIndex}
                href={mainLink.path}
                prefetch={true}
                className={`flex flex-row items-center gap-3 rounded p-3 font-light focus:outline-none ${
                  isActive
                    ? "font-semibold text-[rgba(255,255,255,1)]"
                    : "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]"
                }`}
                onClick={() => setSidebar(false)}
              >
                {mainLink.icon}
                <span className="lg:hidden xl:block">{mainLink.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
