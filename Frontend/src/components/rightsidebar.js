import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmOrder from './confirm';

function Rightsidebar() {
    return (
        <div className='bg-white min-h-screen w-96 drop-shadow-xl rounded-l-xl ml-auto fixed right-1'>
            <Link to='/edit'>
            <div className='flex items-center justify-between mt-5 ml-7 mb-5'>
                <div>
                    <h1 className='text-2xl font-bold'>Meja 1</h1>
                    <p className='font-semibold'>Charlotte</p>
                </div>
                <img
                    src='img/Group 5.png'
                    alt='Edit'
                    className='mr-6'
                />
            </div>
            </Link>

            <hr className='border-2'></hr>

            {/* menu bar */}
            <div className='overflow-y-auto' style={{ maxHeight: '390px', overflowY: 'auto' }}>
                <div className='flex w-full justify-center'>
                    <div className='sm:mx-auto sm:w-[83%]'>
                        <div className='border-2 border-gray-300 rounded-lg mt-5 overflow-hidden relative'>
                            <div className='p-4 flex items-center space-x-2'>
                                <img
                                    src='img/coffee-misshim.jpeg'
                                    alt='menu'
                                    className='rounded-lg w-14 h-14'
                                />
                                <div className='flex flex-col'>
                                    <h4 className='text-base font-semibold ml-2'>Charlatte</h4>
                                    <h5 className='text-xs ml-2'>IDR 0.000</h5>
                                </div>

                                <div className='flex'>
                                    <h5 className='text-xs font-semibold mt-6 mr-1'>1x</h5>
                                    <h5 className='text-xs ml-14 mt-6'>IDR 0.000</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full justify-center'>
                    <div className='sm:mx-auto sm:w-[83%]'>
                        <div className='border-2 border-gray-300 rounded-lg mt-5 overflow-hidden relative'>
                            <div className='p-4 flex items-center space-x-2'>
                                <img
                                    src='img/tiramisu.jpeg'
                                    alt='menu'
                                    className='rounded-lg w-14 h-14'
                                />
                                <div className='flex flex-col'>
                                    <h4 className='text-base font-semibold ml-2'>Tiramisu</h4>
                                    <h5 className='text-xs ml-2'>IDR 0.000</h5>
                                </div>

                                <div className='flex'>
                                    <h5 className='text-xs font-semibold mt-6 mr-1'>1x</h5>
                                    <h5 className='text-xs ml-14 mt-6'>IDR 0.000</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full justify-center'>
                    <div className='sm:mx-auto sm:w-[83%]'>
                        <div className='border-2 border-gray-300 rounded-lg mt-5 overflow-hidden relative'>
                            <div className='p-4 flex items-center space-x-2'>
                                <img
                                    src='img/macaron.jpeg'
                                    alt='menu'
                                    className='rounded-lg w-14 h-14'
                                />
                                <div className='flex flex-col'>
                                    <h4 className='text-base font-semibold ml-2'>Macaron</h4>
                                    <h5 className='text-xs ml-2'>IDR 0.000</h5>
                                </div>

                                <div className='flex'>
                                    <h5 className='text-xs font-semibold mt-6 mr-1'>1x</h5>
                                    <h5 className='text-xs ml-14 mt-6'>IDR 0.000</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full justify-center'>
                    <div className='sm:mx-auto sm:w-[83%]'>
                        <div className='border-2 border-gray-300 rounded-lg mt-5 overflow-hidden relative'>
                            <div className='p-4 flex items-center space-x-2'>
                                <img
                                    src='img/nasi-goreng.jpeg'
                                    alt='menu'
                                    className='rounded-lg w-14 h-14'
                                />
                                <div className='flex flex-col'>
                                    <h4 className='text-base font-semibold ml-2'>Nasi Goreng</h4>
                                    <h5 className='text-xs ml-2'>IDR 0.000</h5>
                                </div>

                                <div className='flex'>
                                    <h5 className='text-xs font-semibold mt-6 mr-1'>1x</h5>
                                    <h5 className='text-xs ml-14 mt-6'>IDR 0.000</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='border-2'></hr>

            {/* Subtotal & TotalAmount */}
            <div className='flex w-full justify-center'>
                <div className='sm:mx-auto sm:w-[83%]'>
                    <div className='border-2 border-gray-100 bg-gray-100 rounded-lg mt-5 overflow-hidden relative'>
                        <div className='flex ml-4 mt-2 mb-2'>
                            <h4 className='font-bold text-black'>Total Amount</h4>
                            <h4 className='ml-28 text-sm'>IDR 0.000</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button */}
            <Link to='/confirm'>
                <div className='flex justify-center mt-5'>
                    <button className='sm:mx-auto sm:w-[83%] font-semibold bg-red-700 text-white py-3 text-center rounded-md'>Confirm Order</button>
                </div>
            </Link>

        </div>
    );
}

export default Rightsidebar;