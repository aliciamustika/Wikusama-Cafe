import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function AddUser() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: '',
        role: 'cashier',
    });

    const [error, setError] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        if (!data.username || !data.password || !data.role) {
            alert('Semua field harus terisi!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('role', data.role);

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI5NzI4MjQ3LCJleHAiOjE3Mjk4MTQ2NDd9.HIA1jL0EtOQN4Tn_GR_KdDHVWNfM-DUsI75DrVMsFAI';
            await axios.post('https://85c2-180-244-129-91.ngrok-free.app/api/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setData({username:'', password:'', role:'cashier'});
            navigate('/dataUser');
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Gagal menambahkan user. Silakan coba lagi.');
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
                <h2 className="text-lg font-semibold mb-4">Tambahkan User</h2>

                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            {key === 'username' ? 'Username' :
                                key === 'password' ? 'Password' :
                                    key === 'role' ? 'Role' : ''}
                        </label>
                        {key === 'role' ? (
                            <select
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="cashier">Cashier</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                        ) : (
                            <div className="relative">
                                <input
                                    type={key === 'password' && !showPassword ? 'password' : 'text'}
                                    value={value}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className={`block w-full p-2 border border-gray-300 rounded ${key === 'username' ? 'text-left' : 'pl-10'}`}
                                />
                                {key === 'password' && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-5 left-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex justify-end mt-4 mb-4">
                    <button
                        type="submit"
                        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSave}
                    >
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;