import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function EditDrink() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        details: '',
        price: '',
        image: null
    });

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
                const response = await axios.get(`https://85c2-180-244-129-91.ngrok-free.app/api/drink/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                console.log(data); 

                setData({
                    name: response.data.data.name,
                    details: response.data.data.details,
                    price: response.data.data.price,
                    image: response.data.data.image,
                });
            } catch (error) {
                console.error('Error fetching drink data:', error);
            }
        };

        fetchDrinkData();
    }, [id]);

    const handleSave = async () => {
        if (!data.name || !data.details || !data.price || !data.image) {
            alert('Semua field harus terisi!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('details', data.details);
            formData.append('price', data.price);
            if (data.img) {
                formData.append('image', data.image);
            }

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
            await axios.put(`https://85c2-180-244-129-91.ngrok-free.app/api/drink/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/dataMenu');
        } catch (error) {
            console.error('Error updating drink:', error);
        }
    };

    const handleCancel = () => {
        navigate('/dataMenu');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleChange('image', file);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 pb-5 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data Menu Minuman</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'name' ? 'Nama Menu' :
                                key === 'details' ? 'Deskripsi' :
                                    key === 'price' ? 'Harga' :
                                        key === 'image' ? 'Image' : ''}
                        </label>
                        {key === 'image' ? (
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <input
                                value={key !== 'image' ? value : undefined} // Jangan set value untuk input type file
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
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

export default EditDrink;