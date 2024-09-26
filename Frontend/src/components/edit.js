import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        meja: 1,
        namaPelanggan: 'Charlotte',
        idPelanggan: '1',
        namaKasir: 'Narendra Tama',
        tanggal: '2024-01-01'
    });

    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleBack = () => {
        navigate('/pemesanan');
    };

    return (
        <div className="flex justify-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 mb-4 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data Pelanggan</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'meja' ? 'Meja' : key === 'namaPelanggan' ? 'Nama Pelanggan' :
                                key === 'idPelanggan' ? 'ID Pelanggan' :
                                    key === 'namaKasir' ? 'Nama Kasir' : 'Tanggal'}
                        </label>
                        {editing ? (
                            <input
                                type={key === 'tanggal' ? 'date' : 'text'}
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <span className="block p-2 border border-gray-300 rounded bg-gray-100">
                                {value}
                            </span>
                        )}
                    </div>
                ))}

                {editing ? (
                    <div className="flex justify-end mt-4">
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
                ) : (
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Edit;
