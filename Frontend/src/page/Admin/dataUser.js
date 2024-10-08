import React, { useState } from 'react';
import Leftsidebar from '../Admin/leftsidebar';
import { Link, } from 'react-router-dom';

function DataUser() {
    const handleDelete = (id) => {
        const updatedUserData = userData.filter(data => data.id !== id);
        setUserData(updatedUserData);
    };

    const [userData, setUserData] = useState([
        {
            email: 'cashier@gmail.com',
            name: 'Narendra',
            role: 'Cashier',
            status: 'Active',
        },
        {
            email: 'admin@gmail.com',
            name: 'Alyssa',
            role: 'Admin',
            status: 'Inactive',
        },
        {
            email: 'manager@gmail.com',
            name: 'Alicia',
            role: 'Manager',
            status: 'Holiday',
        },
        {
            email: 'Cashier1@gmail.com',
            name: 'Kevin',
            role: 'Cashier',
            status: 'Resign',
        },
    ]);

    return (
        <>
            <Leftsidebar />
            <div className='flex bg-red-700 min-h-12 justify-between items-center'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Data User</h3>
                <Link to='/addUser'>
                    <div className='flex flex-row mr-4'>
                        <img
                            src='/img/plus.png'
                            alt='add'
                            className='h-4 mt-1 mr-2'
                        />
                        <button className='text-white font-semibold text-sm'>Add User</button>
                    </div>
                </Link>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-1 ml-48">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-7 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    EMAIL
                                </th>
                                <th className="px-4 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    NAME
                                </th>
                                <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    ROLE
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
                            {userData.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200">
                                    <td className="px-7 py-4 whitespace-nowrap font-normal">{user.email}</td>
                                    <td className="px-4 py-4 whitespace-nowrap font-normal">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">{user.role}</td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className='text-left'>
                                            <span
                                                className={`text-sm font-semibold ${user.status === 'Active' ? 'text-green-500' :
                                                        user.status === 'Inactive' ? 'text-gray-500' :
                                                            user.status === 'Resign' ? 'text-red-500' :
                                                                'text-orange-500'
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center py-3">
                                        <Link to='/editUser'>
                                            <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                        </Link>
                                        <button onClick={() => handleDelete(user.id)} >
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

export default DataUser;