/** @format */

import Link from "next/link";
import React from "react";

const mainpage = () => {
  return (
    <div className='flex w-full justify-center bg-gray-100 p-5'>
      <div className='w-full -mt-4 bg-white p-6 rounded-lg shadow-lg'>
        <div className='grid grid-cols-2 gap-10 items-center'>
          {/* Left Section */}
          <div>
            <p className='text-green-600 font-semibold uppercase'>
              Become Instructors
            </p>
            <h2 className='text-4xl font-bold text-gray-900 leading-tight mt-2'>
              Share Your Expertise with the World
            </h2>
            <p className='text-gray-600 mt-4'>
              Egestas faucibus nisl et ultricies. Tempus lectus condimentum
              tristique mauris id vitae. Id pulvinar a eget vitae pellentesque
              ridiculus platea. Vulputate cursus.
            </p>
            <Link href='/trainers/loginpage'>
            <button
              className='mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md 
          hover:bg-green-600 transition-all duration-200 cursor-pointer'
            >
              Become Trainer
            </button>
            </Link>
          </div>

          {/* Right Section */}
          <div className='space-y-6'>
            <div className='flex items-start space-x-4'>
              <div className='bg-green-500 p-3 rounded-full'>
                <span className='text-white text-2xl'>📖</span>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Teach Your Way
                </h3>
                <p className='text-gray-600'>
                  Enim amet enim volutpat luctus ipsum pellentesque massa nisl
                  sed. Sit ut nibh odio morbi diam.
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-green-500 p-3 rounded-full'>
                <span className='text-white text-2xl'>📖</span>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Inspiration for those who want to learn
                </h3>
                <p className='text-gray-600'>
                  Enim amet enim volutpat luctus ipsum pellentesque massa nisl
                  sed. Sit ut nibh odio morbi diam.
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-green-500 p-3 rounded-full'>
                <span className='text-white text-2xl'>📖</span>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Get Rewarded
                </h3>
                <p className='text-gray-600'>
                  Enim amet enim volutpat luctus ipsum pellentesque massa nisl
                  sed. Sit ut nibh odio morbi diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mainpage;
