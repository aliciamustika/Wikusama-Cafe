import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        pemesanan: {
            default: '/img/cashier (1).png',  // Gambar default
            active: '/img/cashier.png',     // Gambar aktif
        },
        daftar: {
            default: '/img/transaction-history.png',
            active: '/img/transaction-history (1).png',
        },
    };

    const buttons = [
        { name: 'Pemesanan', path: '/pemesanan', icon: icons.pemesanan },
        { name: 'Daftar Transaksi', path: '/daftar', icon: icons.daftar },
    ];

    return (
        <div className='bg-white min-h-screen w-50 drop-shadow-xl rounded-r-xl p-5 fixed'>
            <h1 className='text-3xl font-bold text-center mt-2'>Wikusama</h1>
            <h1 className='text-3xl font-bold text-center'>Cafe</h1>
            <h3 className='font-bold text-center mt-2'>Cashier</h3>

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
                            className='inline-block w-4 h-4 mr-2'
                        />
                        {button.name}
                    </Link>
                ))}
            </div>

            <div className='mt-80 text-sm'>
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
