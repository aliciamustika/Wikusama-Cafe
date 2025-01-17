import React, { useEffect, useState } from "react";
import Leftsidebar from "./leftsidebar";
import { Link, } from "react-router-dom";
import axios from 'axios';

function DataMeja() {
    const [tableItems, setTableItems] = useState([]);

    useEffect(() => {
        const fetchTableItems = async () => {
            try {
                const response = await axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/table');

                console.log('Response Data:', response.data);

                const tableItemsWithStatus = response.data.data.map(table => ({
                    ...table,
                    status: table.isEmpty ? 'Ready' : 'Used',
                }));

                setTableItems(tableItemsWithStatus);
            } catch (error) {
                console.error('Error fetching table items:', error);
            }
        };

        fetchTableItems();
    }, []);

    const handleDelete = async (id) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';

        try {
            await axios.delete(`https://85c2-180-244-129-91.ngrok-free.app/api/table/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const updatedTableItems = tableItems.filter(table => table.id !== id);
            setTableItems(updatedTableItems);
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

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
                <div className="container mx-auto p-1 ml-24">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    MEJA
                                </th>
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    STATUS
                                </th>
                                <th className="px-4 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableItems.map((table) => (
                                <tr key={table.id} className="border-b border-gray-200">
                                    <td className="px-4 py-4 whitespace-nowrap font-normal text-center">{table.number}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className='text-center'>
                                            <span
                                                className={`text-sm font-semibold ${table.status === 'Ready' ? 'text-green-500' : 'text-orange-500'}`}>
                                                {table.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="flex justify-center items-center px-4 py-4">
                                        <Link to={`/editTable/${table.id}`}>
                                            <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                        </Link>
                                        <button onClick={() => handleDelete(table.id)} >
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