import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://85c2-180-244-129-91.ngrok-free.app/api/auth/login', {
        "username": username,
        "password": password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        withCredentials: false
      });

      const { user, access_token } = response.data;
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      switch (user.role) {
        case 'cashier':
          navigate('/pemesanan');
          break;
        case 'admin':
          navigate('/dataUser');
          break;
        case 'manager':
          navigate('/dataTransaksi');
          break;
        default:
          setError('Role tidak valid');
      }
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className='min-h-screen py-16 bg-slate-400'>
      <div className="container mx-auto">
        <div className='flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <div className='w-1/2 bg-gradient-to-bl from-red-900 to-red-700'>
            <img src='/img/coffee-logo.png' alt='' />
            <h2 className='text-white text-center mb-5'>Where Every Cup Tells a Story</h2>
          </div>
          <div className='w-1/2 py-16 px-12'>
            <h1 className='font-semibold text-3xl mb-1'>Login</h1>
            <p className='font-semibold mb-10'>Please login as your role</p>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className='mt-5 shadow-lg rounded-md'>
                <input
                  type='text'
                  placeholder='Username'
                  className='rounded-md border-gray-400 py-1 px-2 h-10 w-full'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='mt-7 shadow-md rounded-md'>
                <input
                  type='password'
                  placeholder='Password'
                  className='rounded-md border-gray-400 py-1 px-2 h-10 w-full'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mt-12 mb-14 text-sm grid gap-8'>
                <button type="submit" className='font-semibold text-white bg-red-700 py-3 text-center rounded-md'>
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
