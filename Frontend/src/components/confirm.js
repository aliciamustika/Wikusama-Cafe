import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmOrder() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        totalHarga: 520,
        statusPembayaran: "Belum Bayar",
        cash: 0,
        change: 0
    });

    const handleConfirm = () => {
        setData((prevData) => ({
            ...prevData,
            statusPembayaran: "Sudah Bayar"
        }));
    };

    const handleCashChange = (e) => {
        const cashValue = parseFloat(e.target.value) || 0;
        setData((prevData) => ({
            ...prevData,
            cash: cashValue,
            change: cashValue >= prevData.totalHarga ? cashValue - prevData.totalHarga : cashValue
        }));
    };

    const handleExit = () => {
        navigate("/pemesanan");
    }

    return (
        <div className="flex justify-center container mx-auto p-4 mt-32">
            <div className="w-5/12 bg-white shadow-md rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Konfirmasi Pembayaran</h2>
                <div className="flex flex-col">
                    <div className="flex justify-between py-2">
                        <span className="font-medium">Total Harga:</span>
                        <span>{data.totalHarga}</span>
                    </div>

                    <div className="flex justify-between py-2">
                        <span className="font-medium">Cash:</span>
                        <input
                            type="number"
                            value={data.cash}
                            onChange={handleCashChange}
                            className="border text-right rounded py-1"
                        />
                    </div>

                    <div className="flex justify-between py-2">
                        <span className="font-medium">Change:</span>
                        <span>{data.change}</span>
                    </div>

                    <div className="flex justify-between py-2">
                        <span className="font-medium">Status Pembayaran:</span>
                        <span>{data.statusPembayaran}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-medium">Actions:</span>
                        {data.statusPembayaran === "Belum Bayar" ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleConfirm}
                            >
                                Konfirmasi
                            </button>
                        ) : (
                            <span className="text-green-500">Pembayaran Sudah Dikonfirmasi</span>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleExit}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
