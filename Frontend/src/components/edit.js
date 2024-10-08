import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        meja: '',
        namaPelanggan: 'Charlotte',
        namaKasir: 'Narendra Tama',
        tanggal: '2024-01-01'
    });

    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        setEditing(false);
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
                            {key === 'meja' ? 'Meja' : key === 'namaPelanggan' ? 'Nama Pelanggan' :
                                    key === 'namaKasir' ? 'Nama Kasir' : 'Tanggal'}
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
                            value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Pilih Meja</option>
                                <option value="1A">1A</option>
                                <option value="2A">2A</option>
                                <option value="3A">3A</option>
                                <option value="4A">4A</option>
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