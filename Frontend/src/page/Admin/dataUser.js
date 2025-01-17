import React, { useState, useEffect } from 'react';
import Leftsidebar from '../Admin/leftsidebar';
import { Link, } from 'react-router-dom';
import axios from 'axios';

function DataUser() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
                const response = await axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.data); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);
    

    // const handleDelete = (id) => {
    //     const updatedUserData = userData.filter(data => data.id !== id);
    //     setUserData(updatedUserData);
    // };

    // const [userData, setUserData] = useState([
    //     {
    //         email: 'cashier@gmail.com',
    //         name: 'Narendra',
    //         role: 'Cashier',
    //         status: 'Active',
    //     },
    //     {
    //         email: 'admin@gmail.com',
    //         name: 'Alyssa',
    //         role: 'Admin',
    //         status: 'Inactive',
    //     },
    //     {
    //         email: 'manager@gmail.com',
    //         name: 'Alicia',
    //         role: 'Manager',
    //         status: 'Holiday',
    //     },
    //     {
    //         email: 'Cashier1@gmail.com',
    //         name: 'Kevin',
    //         role: 'Cashier',
    //         status: 'Resign',
    //     },
    // ]);

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
                <div className="container mx-auto p-1 ml-28">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    USERNAME
                                </th>
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    ROLE
                                </th>
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200">
                                    <td className="px-4 py-4 whitespace-nowrap font-normal text-center">{user.username}</td>
                                    <td className="px-4 py-4 whitespace-normal font-normal text-center">{user.role}</td>
                                    <td className="flex justify-center items-center px-4 py-4">
                                        <Link to={`/editUser/${user.id}`}>
                                            <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                        </Link>
                                        <button>
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