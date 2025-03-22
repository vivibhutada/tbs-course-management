"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS } from "@/lib/consts/navigation";
import DataContext from "@/context/DataProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const { sidebar } = useContext(DataContext);

  return (
    <>
      <div className="w-full h-full bg-gradient-to-b from-green-800 to-green-950 rounded-xl flex flex-col justify-start items-start gap-5 font-['Poppins']">
        {/* Sidebar Links */}
        <div className="w-full p-4 flex flex-col gap-0.5 text-sm">
          {SIDEBAR_LINKS.map((mainLink, mainLinkIndex) => {
            const isActive = pathname.startsWith(mainLink.path);

            return (<Link
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
            </Link>)
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
