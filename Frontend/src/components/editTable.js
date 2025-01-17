import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function EditTable() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        number: '',
        status: '',
    });

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(`https://85c2-180-244-129-91.ngrok-free.app/api/table/${id}`);
                setData({
                    number: response.data.data.number,
                    status: response.data.data.isEmpty,
                });
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchTableData();
    }, [id]);

    const handleSave = async () => {
        if (!data.number || !data.status) {
            alert('Semua field harus terisi!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('number', data.number);
            formData.append('isEmpty', data.isEmpty);

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI5NjAzNDg5LCJleHAiOjE3Mjk2ODk4ODl9.n0XYpQ4o9SdzseH8Eg5XteHZhXUdJJ6OhagXdpcM5H0';
            await axios.put(`https://85c2-180-244-129-91.ngrok-free.app/api/table/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/dataMeja');
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const handleCancel = () => {
        navigate('/dataMeja');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 pb-5 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Meja</h2>

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
                                type={key === 'number' ? 'text' : 'text'}
                                value={value}
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

export default EditTable;