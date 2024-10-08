import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditFood() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: 1,
        nama: 'Charlatte',
        deskripsi: 'Espresso dengan susu panas dan sedikit foam di atasnya.',
        harga: 'IDR 0.000',
        img: 'charlatte.png'
    });

    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        setEditing(false);
    };

    const handleCancel = () => {
        navigate('/dataMakanan');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="flex justify-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 mb-4 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data Makanan</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'id' ? 'ID' : key === 'nama' ? 'Nama Makanan' :
                                key === 'deskripsi' ? 'Deskripsi' :
                                key === 'harga' ? 'Harga' :
                                    'img'}
                        </label>
                        {editing ? (
                            <input
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
            </form>
        </div>
    );
}

export default EditFood;