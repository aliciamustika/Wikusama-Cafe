import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Leftsidebar from "./leftsidebar";
import DataCoffee from "../../components/dataCoffee";
import DataSnack from "../../components/dataSnack";
import DataDesserts from "../../components/dataDesserts";
import DataMainCourse from "../../components/dataMainCourse";

function DataMenu() {
    const [kategori, setKategori] = useState('dataCoffee');

    return (
        <>
            <Leftsidebar />

            {/* Navbar */}
            <div className='flex bg-red-700 min-h-12 justify-between items-center'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Data Menu</h3>
                <Link to='/addMenu'>
                    <div className='flex flex-row mr-4'>
                        <img
                            src='/img/plus.png'
                            alt='add'
                            className='h-4 mt-1 mr-2'
                        />
                        <button className='text-white font-semibold text-sm'>Add Menu</button>
                    </div>
                </Link>
            </div>

            {/* Menu Bar */}
            <div className='flex ml-56 mt-7 mb-7'>
                <Link to='#' onClick={() => setKategori('dataCoffee')}>
                    <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'dataCoffee' ? 'bg-red-700' : 'bg-white'}`}>
                        <img
                            src={kategori === 'dataCoffee' ? 'img/coffee-icon.png' : 'img/coffee-icon(2).png'}
                            alt='coffee'
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className={`text-center font-semibold mb-3 ${kategori === 'dataCoffee' ? 'text-white' : 'text-black'}`}>Coffee</h1>
                    </div>
                </Link>

                <Link to='#' onClick={() => setKategori('dataSnack')}>
                    <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'dataSnack' ? 'bg-red-700' : 'bg-white'}`}>
                        <img
                            src={kategori === 'dataSnack' ? 'img/snack.png' : 'img/snack(2).png'}
                            alt='snack'
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className={`text-center font-semibold mb-3 ${kategori === 'dataSnack' ? 'text-white' : 'text-black'}`}>Snack</h1>
                    </div>
                </Link>

                <Link to='#' onClick={() => setKategori('dataDesserts')}>
                    <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'dataDesserts' ? 'bg-red-700' : 'bg-white'}`}>
                        <img
                            src={kategori === 'dataDesserts' ? 'img/desserts.png' : 'img/desserts(2).png'}
                            alt='desserts'
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className={`text-center font-semibold mb-3 ${kategori === 'dataDesserts' ? 'text-white' : 'text-black'}`}>Desserts</h1>
                    </div>
                </Link>

                <Link to='#' onClick={() => setKategori('dataMainCourse')}>
                    <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg ${kategori === 'dataMainCourse' ? 'bg-red-700' : 'bg-white'}`}>
                        <img
                            src={kategori === 'dataMainCourse' ? 'img/main-course.png' : 'img/main-course(2).png'}
                            alt='main course'
                            className='w-6 h-6 mt-3 mb-2'
                        />
                        <h1 className={`text-center font-semibold mb-3 ${kategori === 'dataMainCourse' ? 'text-white' : 'text-black'}`}>Main Course</h1>
                    </div>
                </Link>
            </div>

            {/* menu bar */}
            {kategori === 'dataCoffee' && <DataCoffee />}
            {kategori === 'dataDesserts' && <DataDesserts />}
            {kategori === 'dataSnack' && <DataSnack />}
            {kategori === 'dataMainCourse' && <DataMainCourse />}
        </>
    );
}

export default DataMenu;