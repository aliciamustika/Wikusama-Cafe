import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTransaksi from './dataTransaksi';

function Leftsidebar() {
    const [activeButton, setActiveButton] = useState(null);
    const [isHovered, setIsHovered] = useState(null);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };

    const icons = {
        DataTransaksi: {
            default: '/img/transaction-history.png',  // Gambar default
            active: '/img/transaction-history (1).png',     // Gambar aktif
        }
    };

    const buttons = [
        { name: 'Data Transaksi', path: '/dataTransaksi', icon: icons.DataTransaksi },
    ];

    return (
        <div className='flex flex-col bg-white min-h-screen w-50 drop-shadow-xl rounded-r-xl p-5 fixed'>
            <h1 className='text-3xl font-bold text-center mt-2'>Wikusama</h1>
            <h1 className='text-3xl font-bold text-center'>Cafe</h1>
            <h3 className='font-bold text-center mt-2'>Manager</h3>

            <div className='mt-7 flex flex-col items-center'>
                {buttons.map((button, index) => (
                    <Link
                        key={index}
                        to={button.path}
                        onClick={() => handleButtonClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`w-full text-left p-2 mb-2 rounded-lg transition-colors duration-300 ${activeButton === index
                            ? 'bg-red-700 text-white font-semibold'
                            : 'text-black font-semibold bg-transparent hover:bg-red-700 hover:text-white'
                            }`}
                    >
                        <img
                            src={activeButton === index || isHovered === index ? button.icon.active : button.icon.default}
                            alt={button.name}
                            className='inline-block h-6 mr-2'
                        />
                        {button.name}
                    </Link>
                ))}
            </div>

            <div className='mt-auto text-sm'>
                <hr />
                <Link to='/'>
                    <div className='flex space-x-2 justify-center mt-6'>
                        <img
                            src='/img/exit.png'
                            style={{ width: '20px', height: '20px' }}
                            alt="Logout"
                        />
                        <button className='font-semibold'>Logout</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Leftsidebar;