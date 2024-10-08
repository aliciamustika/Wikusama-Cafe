import React, { useState } from "react";
import Leftsidebar from "./leftsidebar";

function DataTransaksi() {
    const [transaksiData, seTransaksiData] = useState([
        {
            meja: 1,
            tanggal: '30 September 2024',
            menu: 'Charlatte, Coofcim, Cinnamon Roll, Bakso, Lemon Butter Cookies, Caramel Cheese Cake, Indomie, Nasi Goreng',
            total: 'IDR 0.000',
            pelanggan: 'Solo',
            kasir: 'Narendra'
        },
        {
            meja: 2,
            tanggal: '1 Oktober 2024',
            menu: 'Charlatte, Coofcim, Cinnamon Roll, Bakso, Lemon Butter Cookies, Caramel Cheese Cake, Indomie, Nasi Goreng',
            total: 'IDR 0.000',
            pelanggan: 'Rengginang',
            kasir: 'Narendra'
        },
    ]);

    return (
        <>
            <Leftsidebar />
            <div className='flex bg-red-700 min-h-12 justify-between items-center'>
                <h3 className='text-xl font-medium text-white ml-52 py-2'>Data Transaksi</h3>
            </div>
            <div className='flex gap-6 bg-white min-h-screen'>
                <div className="container mx-auto p-1 ml-44">
                    <table className="table-auto w-full text-sm font-light">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-7 py-4 text-center font-medium text-gray-900 whitespace-nowrap">
                                    MEJA
                                </th>
                                <th className="px-3 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    TANGGAL
                                </th>
                                <th className="px-4 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
                                    MENU
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
                            {transaksiData.map((data) => (
                                <tr key={data.id} className="border-b border-gray-200">
                                    <td className="px-7 py-4 whitespace-nowrap font-normal text-center">{data.meja}</td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{data.tanggal}</td>
                                    <td className="px-4 py-4 whitespace-normal max-w-xs overflow-hidden font-normal">
                                        <div className="overflow-hidden overflow-ellipsis">
                                            {data.menu}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-normal">{data.total}</td>
                                    <td className="px-3 py-4 whitespace-nowrap font-normal">{data.pelanggan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-normal">{data.kasir}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >

        </>

    );
}

export default DataTransaksi;