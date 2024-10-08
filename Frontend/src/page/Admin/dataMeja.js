import React, { useState } from "react";
import Leftsidebar from "./leftsidebar";
import { Link, } from "react-router-dom";

function DataMeja() {
    const handleDelete = (id) => {
        const updatedMejaItems = mejaItems.filter(meja => meja.id !== id);
        setMejaItems(updatedMejaItems);
    };

    const [mejaItems, setMejaItems] = useState([
        {
            meja: '1A',
            kursi: 4,
            status: 'Used',
        },
        {
            meja: '2A',
            kursi: 6,
            status: 'Reserved',
        },
        {
            meja: '3A',
            kursi: 8,
            status: 'Need Cleaning',
        },
        {
            meja: '4A',
            kursi: 10,
            status: 'Ready',
        },
    ]);

    return (
        <>
            <Leftsidebar />
            <div className='flex bg-red-700 min-h-12 justify-between items-center'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Data Meja</h3>
                <Link to='/addTable'>
                    <div className='flex flex-row mr-4'>
                        <img
                            src='/img/plus.png'
                            alt='add'
                            className='h-4 mt-1 mr-2'
                        />
                        <button className='text-white font-semibold text-sm'>Add Table</button>
                    </div>
                </Link>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-1 ml-48">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-7 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    MEJA
                                </th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    JUMLAH KURSI
                                </th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    STATUS
                                </th>
                                <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mejaItems.map((meja) => (
                                <tr key={meja.id} className="border-b border-gray-200">
                                    <td className="px-7 py-4 whitespace-nowrap font-normal">{meja.meja}</td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{meja.kursi}</td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className='text-left'>
                                            <span
                                                className={`text-sm font-semibold ${meja.status === 'Used' ? 'text-orange-500' :
                                                    meja.status === 'Reserved' ? 'text-yellow-500' :
                                                        meja.status === 'Need Cleaning' ? 'text-teal-500' :
                                                            'text-green-500'
                                                    }`}
                                            >
                                                {meja.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center py-3">
                                        <Link to='/editTable'>
                                            <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                        </Link>
                                        <button onClick={() => handleDelete(meja.id)} >
                                            <img src="/img/bin.png" alt="Delete" className="h-7" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default DataMeja;