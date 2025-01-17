import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function DataCoffee() {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/drink')
            .then(response => {
                console.log(response.data);
                const filteredDrinks = response.data.data.filter(drink => drink.isMainCourse);
                setDrinks(filteredDrinks);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
            await axios.delete(`https://85c2-180-244-129-91.ngrok-free.app/api/drink/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setDrinks(drinks.filter(drink => drink.id !== id));
        } catch (error) {
            console.error('Error deleting drink:', error);
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
                            <th className="px-4 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                DESKRIPSI
                            </th>
                            <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                HARGA
                            </th>
                            <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                IMG
                            </th>
                            <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {drinks.map(drink => (
                            <tr key={drink.id} className="border-b border-gray-200">
                                <td className="px-7 py-4 whitespace-nowrap font-normal">{drink.name}</td>
                                <td className="px-4 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                    <div className="overflow-hidden overflow-ellipsis">
                                        {drink.details}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">IDR {drink.price.toLocaleString()}</td>
                                <td><img
                                    src={`https://85c2-180-244-129-91.ngrok-free.app/${drink.image}`}
                                    alt={drink.name}
                                    className='w-24 h-20 mt-3 mb-2 rounded-lg'
                                />
                                </td>
                                <td className="flex flex-row mt-9 ml-11">
                                    <Link to={`/editDrink/${drink.id}`}>
                                        <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                    </Link>
                                    <button onClick={() => handleDelete(drink.id)}>
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

export default DataCoffee;