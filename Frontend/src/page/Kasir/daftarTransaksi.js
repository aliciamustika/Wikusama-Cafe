import React, { useState } from 'react';
import Sidebar from '../../components/leftsidebar';
import { useNavigate } from 'react-router-dom';

function DaftarTransaksi() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([
        {
            id: 1,
            date: '21 September 2024',
            name: 'Charlotte',
            menu: 'Charlatte, Coofcim, Cinnamon Roll, Bakso, Lemon Butter Cookies, Caramel Cheese Cake, Indomie, Nasi Goreng',
            total: 'IDR 0.000',
            paymentStatus: 'Paid',
        },
        {
            id: 2,
            date: '21 September 2024',
            name: 'Charlotte',
            menu: 'Coffee, Deserts, Main Course',
            total: 'IDR 0.000',
            paymentStatus: 'Paid',
        },
        {
            id: 3,
            date: '21 September 2024',
            name: 'Charlotte',
            menu: 'Coffee, Deserts, Main Course',
            total: 'IDR 0.000',
            paymentStatus: 'Unpaid',
        },
    ]);

    return (
        <>
            <Sidebar />
            <div className='bg-red-700 min-h-12'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Daftar Transaksi</h3>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-4 ml-44">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-7 py-3 text-left font-medium text-gray-900 whitespace-nowrap">
                                    ID
                                </th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    DATE
                                </th>
                                <th className="px-4 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    NAME
                                </th>
                                <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    MENU
                                </th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    TOTAL
                                </th>
                                <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    PAYMENT STATUS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-200">
                                    <td className="px-7 py-4 whitespace-nowrap font-normal">{order.id}</td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{order.date}</td>
                                    <td className="px-4 py-4 whitespace-nowrap font-normal">{order.name}</td>
                                    <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                        <div className="overflow-hidden overflow-ellipsis">
                                            {order.menu}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='text-center'>
                                            <span
                                                className={`text-sm font-semibold ${order.paymentStatus === 'Paid'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                    }`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="text-sm py-5 text-gray-500 mr-2 underline underline-offset-4"
                                            onClick={() => navigate('/nota')}
                                        >
                                            See nota
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

export default DaftarTransaksi;
