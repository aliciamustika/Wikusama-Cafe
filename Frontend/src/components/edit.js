import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Edit({ setCustomerData }) {
    const navigate = useNavigate();
    const [tables, setTables] = useState([]);

    const [data, setData] = useState({
        meja: '',
        namaPelanggan: '',
        tanggal: ''
    });

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/table/empty');
                setTables(response.data.data || []);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    const handleSave = () => {
        setCustomerData({
            name: data.namaPelanggan,
            table: data.meja,
            date: data.tanggal // Simpan tanggal transaksi
        });
        navigate('/pemesanan');
    };
    
    const handleCancel = () => {
        navigate('/pemesanan');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data Pelanggan</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'meja' ? 'Meja' : key === 'namaPelanggan' ? 'Nama Pelanggan' : 'Tanggal'}
                        </label>
                        {key !== 'meja' ? (
                            <input
                                type={key === 'tanggal' ? 'date' : 'text'}
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <select
                                value={data.meja}
                                onChange={(e) => handleChange('meja', e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Pilih Meja</option>
                                {tables.length > 0 ? (
                                    tables.map((table) => (
                                        <option key={table.id} value={table.number}>
                                            {table.number}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No tables available</option>
                                )}
                            </select>
                        )}
                    </div>
                ))}

                <div className="flex justify-end mt-6 mb-5">
                    <button
                        type="button"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
