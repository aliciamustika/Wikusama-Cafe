import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddTable() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        number: '',
        status: 'true', // Set default value to 'true'
    });

    const handleSave = async () => {
        if (!data.number || !data.status) {
            alert('Semua field harus terisi!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('number', data.number);
            formData.append('status', data.status);

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
            await axios.post('https://85c2-180-244-129-91.ngrok-free.app/api/table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/dataMeja');
        } catch (error) {
            console.error('Error adding table:', error);
        }
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
                <h2 className="text-lg font-semibold mb-4">Tambahkan Meja</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'number' ? 'Nomor Meja' :
                                key === 'status' ? 'Status' : ''}
                        </label>
                        {key === 'status' ? (
                            <select
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="true">Ready</option>
                                <option value="false">Used</option>
                            </select>
                        ) : (
                            <input
                                type={key === 'number' ? 'text' : 'text'} // Input type for number
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
                        Add Table
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTable;
