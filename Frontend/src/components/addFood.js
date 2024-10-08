import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFood() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        nama: '',
        deskripsi: '',
        harga: '',
        img: '',
        jenis: ''
    });

    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        navigate('/dataMakanan')
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto">
            <form className="bg-white shadow-md rounded px-8 w-[600px]">
                <h2 className="text-lg font-semibold mb-4 mt-6">Tambahkan Menu</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            { key === 'nama' ? 'Nama Makanan' :
                                key === 'deskripsi' ? 'Deskripsi' :
                                    key === 'harga' ? 'Harga' : 
                                    key === 'img' ? 'Image' : 'Jenis'}
                        </label>
                        {key !== 'jenis' ? (
                            <input
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
                                <option value="">Pilih Jenis</option>
                                <option value="coffee">Coffee</option>
                                <option value="snack">Snack</option>
                                <option value="desserts">Desserts</option>
                                <option value="main course">Main Course</option>
                            </select>
                        )}
                    </div>
                ))}

                    <div className="flex justify-end mt-4 mb-4">
                        <button
                            type="button"
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleSave}
                        >
                            Add Menu
                        </button>
                    </div>
            </form>
        </div>
    );
}

export default AddFood;