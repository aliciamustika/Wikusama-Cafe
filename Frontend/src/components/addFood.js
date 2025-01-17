import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddFood() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        details: '',
        price: '',
        image: null, 
        type: '',
    });

    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!data.name || !data.details || !data.price || !data.image || !data.type) {
            setError('Semua field harus diisi!');
            return;
        }

        setError(''); 

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('details', data.details);
            formData.append('price', data.price);
            formData.append('image', data.image);
            formData.append('isDessert', data.type === 'desserts');
            formData.append('isMainCourse', data.type === 'main course');
            formData.append('isSnack', data.type === 'snack');

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk'; 
            await axios.post('https://85c2-180-244-129-91.ngrok-free.app/api/food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/dataMenu');
        } catch (error) {
            console.error('Error adding food:', error);
        }
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
                <h2 className="text-lg font-semibold mb-4 mt-6">Tambahkan Makanan</h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'name' ? 'Nama Menu' :
                                key === 'details' ? 'Deskripsi' :
                                    key === 'price' ? 'Harga' :
                                        key === 'image' ? 'Image' : 
                                            key === 'type' ? 'Pilih Jenis' : ''}
                        </label>
                        {key === 'image' ? (
                            <input
                                type="file"
                                onChange={(e) => handleChange(key, e.target.files[0])}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        ) : key === 'type' ? (
                            <select
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Pilih Jenis</option>
                                <option value="snack">Snack</option>
                                <option value="desserts">Desserts</option>
                                <option value="main course">Main Course</option>
                            </select>
                        ) : (
                            <input
                                type={key === 'price' ? 'number' : 'text'}
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end mt-4 mb-4">
                    <button
                        type="button"
                        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSave}
                    >
                        Add Food
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddFood;
