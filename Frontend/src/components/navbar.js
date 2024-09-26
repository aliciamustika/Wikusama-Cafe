import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Coffee from './coffee';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const toggleTab = () => {
        navigate('/Coffee');
    }

    return (
        <div className='flex ml-3'>
                {/* <div 
                className='flex flex-col items-center mt-9 ml-6'
                onClick={() => toggleTab(Coffee)}
                >
                    <div className='bg-red-700 w-[150px] rounded-md flex flex-col items-center shadow-lg'>
                        <img
                            src='img/coffee-icon.png'
                            alt=''
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className='text-white text-center font-semibold mb-3'>Coffee</h1>
                    </div>
                    <div className='flex flex-col mt-9'>
                    </div>
                </div> */}

            <Link to='/snack'>
                <div className='flex flex-col items-center mt-9 ml-6'>
                    <div className='bg-red-white w-[150px] rounded-md flex flex-col items-center shadow-lg'>
                        <img
                            src='img/snack.png'
                            alt=''
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className='text-black text-center font-semibold mb-3'>Snack</h1>
                    </div>
                    <div className='flex flex-col mt-3'>
                    </div>
                </div>
            </Link>

            <Link to='/snack'>
                <div className='flex flex-col items-center mt-9 ml-6'>
                    <div className='bg-red-white w-[150px] rounded-md flex flex-col items-center shadow-lg'>
                        <img
                            src='img/desert.png'
                            alt=''
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className='text-black text-center font-semibold mb-3'>Desserts</h1>
                    </div>
                    <div className='flex flex-col mt-3'>
                    </div>
                </div>
            </Link>

            <Link to='/snack'>
                <div className='flex flex-col items-center mt-9 ml-6'>
                    <div className='bg-red-white w-[150px] rounded-md flex flex-col items-center shadow-lg'>
                        <img
                            src='img/main-course.png'
                            alt=''
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className='text-black text-center font-semibold mb-3'>Main Course</h1>
                    </div>
                    <div className='flex flex-col mt-3'>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default Navbar;