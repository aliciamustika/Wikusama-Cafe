import React, { useState } from "react";
import { Link } from "react-router-dom";

function DataMainCourse() {
    const handleDelete = (id) => {
        const updatedFoodItems = foodItems.filter(item => item.id !== id);
        setFoodItems(updatedFoodItems);
    };

    const [foodItems, setFoodItems] = useState([
        {
            id: 1,
            namaMakanan: 'Nasi Goreng',
            deskripsi: 'Nasi yang digoreng dengan berbagai bumbu.',
            harga: 'IDR 0.000',
            img: 'nasigoreng.png',
        },
        {
            id: 2,
            namaMakanan: 'Indomie',
            deskripsi: 'Mocha Cream Latte expresso, susu panas, cokelat disajikan dengan lapisan krim kocok di atasnya.',
            harga: 'IDR 0.000',
            img: 'mieGoreng.png',
        },
        {
            id: 3,
            namaMakanan: 'Nasi Kuning',
            deskripsi: 'Iced Cappuccino dengan expresso yang dicampur dengan susu panas dan foam susu yang lebih tebal.',
            harga: 'IDR 0.000',
            img: 'nasiKuning.png',
        },
    ]);

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
                        {foodItems.map((food) => (
                            <tr key={food.id} className="border-b border-gray-200">
                                <td className="px-7 py-4 whitespace-nowrap font-normal">{food.namaMakanan}</td>
                                <td className="px-4 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                    <div className="overflow-hidden overflow-ellipsis">
                                        {food.deskripsi}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">{food.harga}</td>
                                <td className="px-3 py-4 whitespace-nowrap font-normal">{food.img}</td>
                                <td className="px-6 py-4 flex flex-row ml-10">
                                    <Link to='/editFood'>
                                        <img src="/img/pen.png" alt="Edit" className="h-7 mr-3" />
                                    </Link>
                                    <button onClick={() => handleDelete(food.id)} >
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

export default DataMainCourse;