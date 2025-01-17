import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function DataSnack() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/food')
            .then(response => {
                console.log(response.data);
                const filteredFoods = response.data.data.filter(food => food.isSnack);
                setFoods(filteredFoods);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
            await axios.delete(`https://85c2-180-244-129-91.ngrok-free.app/api/food/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setFoods(foods.filter(food => food.id !== id));
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    return (
        <div className='flex gap-6 bg-white min-h-screen'>
            <div className="container mx-auto p-1 ml-48">
                <table className="table-auto w-full text-sm font-light">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="px-7 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                NAMA MAKANAN
                            </th>
                            <th className="px-5 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                DESKRIPSI
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                HARGA
                            </th>
                            <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                IMAGE
                            </th>
                            <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(food => (
                            <tr key={food.id} className="border-b border-gray-200">
                                <td className="px-7 py-4 whitespace-nowrap font-normal">
                                    <Link to={`/editMenu/${food.id}`}>
                                        {food.name}
                                    </Link>
                                </td>
                                <td className="px-5 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                    <div className="overflow-hidden overflow-ellipsis">
                                        {food.details}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">IDR {food.price.toLocaleString()}</td>
                                <td><img
                                    src={`https://85c2-180-244-129-91.ngrok-free.app/${food.image}`}
                                    alt={food.name}
                                    className='w-24 h-20 mt-3 mb-2 rounded-lg'
                                />
                                </td>
                                <td className="flex flex-row mt-9 ml-11">
                                    <Link to={`/editFood/${food.id}`}>
                                        <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                    </Link>
                                    <button onClick={() => handleDelete(food.id)}>
                                        <img src="/img/bin.png" alt="Delete" className="h-7" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataSnack;