import React, { useEffect, useState } from "react";
import axios from 'axios';
import Leftsidebar from "./leftsidebar";

function DataTransaksi() {
    const [transaksiData, setTransaksiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState({});
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transaksiResponse = await axios.get("https://85c2-180-244-129-91.ngrok-free.app/api/transaction", {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk'
                    }
                });

                if (transaksiResponse.data.isSuccess) {
                    setTransaksiData(transaksiResponse.data.data);
                } else {
                    setError("Failed to fetch data");
                }

                const userResponse = await axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/user', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk'
                    }
                });
                if (userResponse.data.isSuccess) {
                    const userData = userResponse.data.data;
                    const userMap = userData.reduce((acc, user) => {
                        acc[user.id] = user.username;
                        return acc;
                    }, {});
                    setUsers(userMap);
                } else {
                    setError('Failed to fetch users');
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTransaksi = selectedDate
        ? transaksiData.filter(data => new Date(data.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString())
        : transaksiData;

    return (
        <>
            <Leftsidebar />
            <div className='flex bg-red-700 min-h-12 justify-between items-center'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Data Transaksi</h3>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-1 ml-44">
                    <div className="pl-9 mb-3 mt-3">
                        <input
                            type='date'
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border border-gray-300 p-2"
                        />
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                        <table className="table-auto w-full text-sm font-light">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="px-7 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                        MEJA 
                                    </th>
                                    <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                        TANGGAL
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                        TOTAL
                                    </th>
                                    <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                        PELANGGAN
                                    </th>
                                    <th className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                        KASIR
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransaksi.map((data) => (
                                    <tr key={data.id} className="border-b border-gray-200">
                                        <td className="px-7 py-4 whitespace-nowrap font-normal text-center">{data.tableId}</td>
                                        <td className="px-3 py-4 whitespace-nowrap font-normal">{new Date(data.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-normal">{`IDR ${data.total.toLocaleString()}`}</td>
                                        <td className="px-3 py-4 whitespace-nowrap font-normal">{data.customerName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-normal">{users[data.addBy] || 'unknown'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div >

        </>

    );
}

export default DataTransaksi;