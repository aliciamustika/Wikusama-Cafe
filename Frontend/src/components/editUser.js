import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function EditUser() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState({
        username: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
                const response = await axios.get(`https://85c2-180-244-129-91.ngrok-free.app/api/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData({
                    username: response.data.data.username,
                    password: response.data.data.password,
                    role: response.data.data.role,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };        

        fetchUserData();
    }, [id]);

    const handleSave = async (event) => {
        event.preventDefault();
    
        if (!data.username || !data.password || !data.role) {
            alert('Semua field harus terisi!');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('role', data.role);
    
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk';
            const response = await axios.put(`https://85c2-180-244-129-91.ngrok-free.app/api/user/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                navigate('/dataUser');
            } else {
                console.error('Update failed:', response);
            }
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };
    

    const handleCancel = () => {
        navigate('/dataUser');
    };

    const handleChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-8 pb-4 w-[600px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data User</h2>

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

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
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

export default EditUser;