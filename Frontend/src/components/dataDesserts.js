import React, { useState } from "react";
import { Link } from "react-router-dom";

function DataDesserts() {
    const handleDelete = (id) => {
        const updatedFoodItems = foodItems.filter(item => item.id !== id);
        setFoodItems(updatedFoodItems);
    };

    const [foodItems, setFoodItems] = useState([
        {
            id:1,
            namaMakanan: 'Tiramisu',
            deskripsi: 'lapisan biskuit savoiardi yang dicelupkan ke dalam kopi.',
            harga: 'IDR 0.000',
            img: 'tiramisu.png',
        },
        {
            id: 2,
            namaMakanan: 'Cinnamon Roll',
            deskripsi: 'Mocha Cream Latte expresso, susu panas, cokelat disajikan dengan lapisan krim kocok di atasnya.',
            harga: 'IDR 0.000',
            img: 'cinnamonRoll.png',
        },
        {
            id: 3,
            namaMakanan: 'Croisant Beef',
            deskripsi: 'Iced Cappuccino dengan expresso yang dicampur dengan susu panas dan foam susu yang lebih tebal.',
            harga: 'IDR 0.000',
            img: 'croisant.png',
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
                            <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
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
                                <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
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

export default DataDesserts;