import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='min-h-screen py-14 bg-slate-400'>
      <div className="container mx-auto">
        <div className='flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <div className='w-1/2 bg-gradient-to-bl from-red-900 to-red-700'>
            <img src='/img/coffee-logo.png' alt='' />
            <h2 className='text-white text-center mb-5'>Where Every Cup Tells a Story</h2>
          </div>
          <div className='w-1/2 py-16 px-12'>
            <h1 className='font-semibold text-3xl mb-1'>Login</h1>
            <p className='font-semibold mb-10'>Please login as your role</p>
            <form action='#'>
              <div className='mt-5 shadow-lg rounded-md'>
                <input type='text' placeholder='Email' className='rounded-md border-gray-400 py-1 px-2 h-10 w-full' />
              </div>
              <div className='mt-7 shadow-md rounded-md'>
                <input type='password' placeholder='Password' className='rounded-md border-gray-400 py-1 px-2 h-10 w-full' />
              </div>
            </form>
            <div className='mt-12 mb-14 text-sm grid grid-cols-2 gap-8'>
              <button>Forgot password?</button>
              <Link to="/pemesanan" className='font-semibold text-white bg-red-700 py-3 text-center rounded-md'>
                Sign in
              </Link>
            </div>
            <div className='text-sm flex mt-16 space-x-2'>
              <p className='ml-12'>Don’t have an account?</p>
              <button className='font-semibold'>Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
