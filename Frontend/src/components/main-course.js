// src/components/MainCourse.js
import React from 'react';

const MainCourse = () => {
    return (
        <div className='flex flex-col w-[721px]'>
            <div className='flex flex-wrap justify-start'>

                <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1'>
                    <img
                        src='img/nasi-goreng.jpeg'
                        alt=''
                        className='w-44 h-36 mt-3 mb-2 rounded-lg'
                    />
                    <div className='w-full'>
                        <h3 className='font-bold text-base text-left ml-3 w-full'>Nasi Goreng</h3>
                        <p className='text-left w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                            Nasi yang digoreng dengan berbagai bumbu.
                        </p>
                        <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                        <div className='flex justify-center'>
                            <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-8'>
                    <img
                        src='img/nasi-goreng.jpeg'
                        alt=''
                        className='w-44 h-36 mt-3 mb-2 rounded-lg'
                    />
                    <div className='w-full'>
                        <h3 className='font-bold text-base text-left ml-3 w-full'>Nasi Goreng</h3>
                        <p className='text-left w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                            Nasi yang digoreng dengan berbagai bumbu.
                        </p>
                        <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                        <div className='flex justify-center'>
                            <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-8'>
                    <img
                        src='img/nasi-goreng.jpeg'
                        alt=''
                        className='w-44 h-36 mt-3 mb-2 rounded-lg'
                    />
                    <div className='w-full'>
                        <h3 className='font-bold text-base text-left ml-3 w-full'>Nasi Goreng</h3>
                        <p className='text-left w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                            Nasi yang digoreng dengan berbagai bumbu.
                        </p>
                        <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                        <div className='flex justify-center'>
                            <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1'>
                    <img
                        src='img/nasi-goreng.jpeg'
                        alt=''
                        className='w-44 h-36 mt-3 mb-2 rounded-lg'
                    />
                    <div className='w-full'>
                        <h3 className='font-bold text-base text-left ml-3 w-full'>Nasi Goreng</h3>
                        <p className='text-left w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                            Nasi yang digoreng dengan berbagai bumbu.
                        </p>
                        <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                        <div className='flex justify-center'>
                            <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainCourse;