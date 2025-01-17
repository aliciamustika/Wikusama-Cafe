import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Nota() {
    const { idTransaksi } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [foodNames, setFoodNames] = useState({});
    const [drinkNames, setDrinkNames] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/transaction', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                    }
                });

                const foundOrder = response.data.data.find(o => o.id === Number(idTransaksi));
                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    setError('Order not found');
                }
            } catch (err) {
                console.error('Error fetching order:', err);
                setError('Failed to fetch order data');
            }
        };

        const fetchMenu = async () => {
            try {
                const [foodResponse, drinkResponse] = await Promise.all([
                    axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/food', {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                        }
                    }),
                    axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/drink', {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk',
                        }
                    }),
                ]);

                const foodMap = foodResponse.data.isSuccess
                    ? foodResponse.data.data.reduce((acc, item) => {
                        acc[item.id] = item.name;
                        return acc;
                    }, {})
                    : {};

                const drinkMap = drinkResponse.data.isSuccess
                    ? drinkResponse.data.data.reduce((acc, item) => {
                        acc[item.id] = item.name;
                        return acc;
                    }, {})
                    : {};

                setFoodNames(foodMap);
                setDrinkNames(drinkMap);

            } catch (err) {
                console.error('Error fetching menu data:', err);
                setError('Failed to fetch menu data');
            }
        };

        fetchOrder();
        fetchMenu();
    }, [idTransaksi]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalAmount = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 border border-black w-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-red-800">Wikusama <span className="text-black">Cafe</span></h1>
                        <p className="text-sm">Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang,<br />Kota Malang, Jawa Timur</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">Cashier: {order.addBy}</p>
                        <p className="text-sm">
                            {new Date(order.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
                <div className="border-t border-b border-black py-2 mb-4">
                    <p>Pemesan: {order.customerName} | ID: {order.id}</p>
                </div>
                <table className="w-full border-collapse border border-black mb-4">
                    <thead>
                        <tr>
                            <th className="border border-black p-2">NO</th>
                            <th className="border border-black p-2">ITEM</th>
                            <th className="border border-black p-2">QTY</th>
                            <th className="border border-black p-2">PRICE</th>
                            <th className="border border-black p-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => {
                            const itemName = item.foodId ? foodNames[item.foodId] : (item.drinkId ? drinkNames[item.drinkId] : 'Unknown Item');
                            return (
                                <tr key={item.id}>
                                    <td className="border border-black p-2 text-center">{index + 1}</td>
                                    <td className="border border-black p-2">{itemName}</td>
                                    <td className="border border-black p-2 text-center">{item.quantity}</td>
                                    <td className="border border-black p-2 text-right">IDR {item.price.toLocaleString()}</td>
                                    <td className="border border-black p-2 text-right">IDR {(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="flex justify-between mb-4">
                    <p className="font-bold text-lg">Total Amount</p>
                    <p className="font-bold text-lg">IDR {totalAmount.toLocaleString()}</p>
                </div>
                <p className="text-center">TERIMA KASIH SUDAH MEMESAN</p>
            </div>
        </div>
    );
}

export default Nota;