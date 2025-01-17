import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './leftsidebar';
import { useNavigate, Link } from 'react-router-dom';

function DaftarTransaksi() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [foodNames, setFoodNames] = useState({});
    const [drinkNames, setDrinkNames] = useState({});
    const [error, setError] = useState(null);

    const handleSeeNota = (orderId) => {
        console.log("Navigating to nota with Order ID:", orderId);
        navigate('/nota', { state: { orderId } });
    };

    useEffect(() => {
        const fetchOrdersAndMenu = async () => {
            try {
                const [ordersResponse, foodResponse, drinkResponse] = await Promise.all([
                    axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/transaction', {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                        },
                    }),
                    axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/food', {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                        },
                    }),
                    axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/drink', {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                        },
                    }),
                ]);

                if (ordersResponse.data.isSuccess) {
                    setOrders(ordersResponse.data.data);
                } else {
                    setOrders([]);
                }

                const foodMap = foodResponse.data.isSuccess
                    ? foodResponse.data.data.reduce((acc, item) => {
                        acc[item.id] = item.name;
                        return acc;
                    }, {})
                    : {};
                setFoodNames(foodMap);

                const drinkMap = drinkResponse.data.isSuccess
                    ? drinkResponse.data.data.reduce((acc, item) => {
                        acc[item.id] = item.name;
                        return acc;
                    }, {})
                    : {};
                setDrinkNames(drinkMap);

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        fetchOrdersAndMenu();
    }, []);

    return (
        <>
            <Sidebar />
            <div className='bg-red-700 min-h-12'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Daftar Transaksi</h3>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-1 ml-48">
                    {error && <div className="text-red-500">{error}</div>}
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-7 py-4 text-left font-medium text-gray-900 whitespace-nowrap">DATE</th>
                                <th className="px-4 py-4 text-left font-medium text-gray-900 whitespace-nowrap">NAME</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">MENU</th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">TOTAL</th>
                                <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap">PAYMENT STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-200">
                                    <td className="px-7 py-4 whitespace-nowrap font-normal">{new Date(order.date).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap font-normal">{order.customerName}</td>
                                    <td className="px-6 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                        <div className="overflow-hidden overflow-ellipsis">
                                            {order.items.map(item => {
                                                const food = item.foodId ? foodNames[item.foodId] : '';
                                                const drink = item.drinkId ? drinkNames[item.drinkId] : '';
                                                return `${food ? food : ''} ${drink ? drink : ''}`.trim();
                                            }).join(', ')}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{`IDR ${order.total.toLocaleString()}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`text-sm font-semibold ${order.status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/nota/${order.id}`}
                                            className="text-sm py-5 text-gray-500 mr-2 underline underline-offset-4">
                                            See nota
                                        </Link>

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
