import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Leftsidebar from './leftsidebar';
import Rightsidebar from '../../components/rightsidebar';
import Coffee from '../../components/coffee';
import Desserts from '../../components/desserts';
import Snack from '../../components/snack';
import MainCourse from '../../components/main-course';
import Edit from '../../components/edit';
import { Routes, Route } from 'react-router-dom';

function Pemesanan() {
  const [kategori, setKategori] = useState('coffee');
  const [cartItems, setCartItems] = useState([]);

  const [customerData, setCustomerData] = useState({
    name: 'Charlotte',
    table: 1,
    date: '',
  });

  const handleCustomerUpdate = (newCustomerData) => {
    setCustomerData(newCustomerData);
  };

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 0) + 1
        };
        return updatedItems;
      }
      const newItemWithQuantity = { ...newItem, quantity: 1 };
      return [...prevItems, newItemWithQuantity];
    });
  };

  return (
    <div className='flex gap-6 bg-gray-100'>
      {/* left sidebar */}
      <Leftsidebar />

      {/* body */}
      <div className='flex flex-col ml-56 min-h-screen'>

        {/* search bar */}
        {/* <div className='bg-white w-[500px] rounded-lg h-11 ml-32 mt-7 shadow-lg flex items-center'>
          <img
            src='img/search-icon.png'
            alt='search'
            className='w-5 h-5 ml-3'
          />
          <input
            type='search'
            placeholder='Search here'
            className='w-full p-3 rounded-lg text-sm outline-none'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div> */}

        {/* navbar menu body */}
        <div className='flex justify-center mt-7 mb-7'>
          <Link to='#' onClick={() => setKategori('coffee')}>
            <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'coffee' ? 'bg-red-700' : 'bg-white'}`}>
              <img
                src={kategori === 'coffee' ? 'img/coffee-icon.png' : 'img/coffee-icon(2).png'}
                alt='coffee'
                className='w-6 h-6 mt-3 mb-2'
              />
              <h1 className={`text-center font-semibold mb-3 ${kategori === 'coffee' ? 'text-white' : 'text-black'}`}>Coffee</h1>
            </div>
          </Link>

          <Link to='#' onClick={() => setKategori('snack')}>
            <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'snack' ? 'bg-red-700' : 'bg-white'}`}>
              <img
                src={kategori === 'snack' ? 'img/snack.png' : 'img/snack(2).png'}
                alt='snack'
                className='w-6 h-6 mt-3 mb-2'
              />
              <h1 className={`text-center font-semibold mb-3 ${kategori === 'snack' ? 'text-white' : 'text-black'}`}>Snack</h1>
            </div>
          </Link>

          <Link to='#' onClick={() => setKategori('desserts')}>
            <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg mr-5 ${kategori === 'desserts' ? 'bg-red-700' : 'bg-white'}`}>
              <img
                src={kategori === 'desserts' ? 'img/desserts.png' : 'img/desserts(2).png'}
                alt='desserts'
                className='w-6 h-6 mt-3 mb-2'
              />
              <h1 className={`text-center font-semibold mb-3 ${kategori === 'desserts' ? 'text-white' : 'text-black'}`}>Desserts</h1>
            </div>
          </Link>

          <Link to='#' onClick={() => setKategori('main-course')}>
            <div className={`w-[150px] rounded-md flex flex-col items-center shadow-lg ${kategori === 'main-course' ? 'bg-red-700' : 'bg-white'}`}>
              <img
                src={kategori === 'main-course' ? 'img/main-course.png' : 'img/main-course(2).png'}
                alt='main course'
                className='w-6 h-6 mt-3 mb-2'
              />
              <h1 className={`text-center font-semibold mb-3 ${kategori === 'main-course' ? 'text-white' : 'text-black'}`}>Main Course</h1>
            </div>
          </Link>
        </div>

        {/* menu bar */}
        {kategori === 'coffee' && <Coffee addToCart={addToCart} />}
        {kategori === 'desserts' && <Desserts addToCart={addToCart} />}
        {kategori === 'snack' && <Snack addToCart={addToCart} />}
        {kategori === 'main-course' && <MainCourse addToCart={addToCart} />}
      </div>

      {/* right sidebar */}
      <Rightsidebar cartItems={cartItems} setCartItems={setCartItems} customerData={customerData} />
    </div>
  );
}

export default Pemesanan;
