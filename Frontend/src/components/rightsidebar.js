import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Rightsidebar({ cartItems, setCartItems, customerData }) {
    const [notification, setNotification] = useState('');

    const handleRemoveFromCart = (itemId) => {
        if (window.confirm("Are you sure you want to remove this item from the cart?")) {
            setCartItems(prevItems => {
                const updatedItems = prevItems.filter(item => item.id !== itemId);
                console.log(`item with ID: ${itemId} has been removed from the cart.`);
                return updatedItems.map(item => ({
                    ...item,
                    quantity: item.quantity || 0
                }));
            });
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const itemQuantity = item.quantity || 1;
        return total + item.price * itemQuantity;
    }, 0);

    const handleCheckout = async () => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }));

        const foodItems = updatedCartItems
            .filter(item => item.isSnack || item.isDessert || item.isMainCourse)
            .reduce((acc, item) => {
                const foundItem = acc.find(i => i.id === item.id);
                if (foundItem) {
                    foundItem.qty += item.quantity;
                } else {
                    acc.push({ id: item.id, qty: item.quantity });
                }
                return acc;
            }, []);

        const drinkItems = updatedCartItems
            .filter(item => item.isDrink)
            .reduce((acc, item) => {
                const foundItem = acc.find(i => i.id === item.id);
                if (foundItem) {
                    foundItem.qty += item.quantity;
                } else {
                    acc.push({ id: item.id, qty: item.quantity });
                }
                return acc;
            }, []);

        if (foodItems.length === 0 && drinkItems.length === 0) {
            console.error('Tidak ada item untuk ditambahkan ke pesanan.');
            return;
        }

        const transactionData = {
            customerName: "Charlotte",
            status: 'paid',
            tableId: 1,
            date: new Date(),
            food: foodItems,
            drink: drinkItems,
        };

        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4NjM0NTY1fQ.Lk4PhwN5jsBSJM5Onq19n1NMdEJh-zq_GGeyEtQXUWk'; // replace with your actual token
            const response = await axios.post('https://85c2-180-244-129-91.ngrok-free.app/api/transaction/new', transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            setNotification('Payment Successful!');
            setCartItems([]);
            setTimeout(() => {
                setNotification('');
            }, 3000);

            console.log('Transaksi ditambahkan:', response.data);
        } catch (error) {
            console.error('Error menambahkan ke keranjang:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='bg-white min-h-screen w-96 drop-shadow-xl rounded-l-xl ml-auto fixed right-1'>
            {notification && (
                <div className='bg-green-500 text-white text-center py-2'>
                    {notification}
                </div>
            )}

            {/* <Link to='/edit'> */}
                <div className='flex items-center justify-between mt-5 ml-7 mb-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>Meja {customerData.table}</h1>
                        <p className='font-semibold'>{customerData.name}</p>
                        {customerData.date && <p className='text-sm'>Tanggal: {new Date(customerData.date).toLocaleDateString()}</p>}
                    </div>
                    {/* <img
                        src='img/Group 5.png'
                        alt='Edit'
                        className='mr-6'
                    /> */}
                </div>
            {/* </Link> */}

            <hr className='border-2'></hr>

            <div className='flex flex-col justify-between' style={{ height: 'calc(100vh - 245px)' }}>
                <div className='overflow-y-auto' style={{ maxHeight: '385px' }}>
                    {cartItems.length === 0 ? (
                        <div className='flex justify-center mt-5'>
                            <p className='text-gray-500'>Cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className='flex w-full justify-center'>
                                <div className='sm:mx-auto sm:w-[83%]'>
                                    <div className='border-2 border-gray-300 rounded-lg mt-5 overflow-hidden relative'>
                                        <div className='p-2 flex items-center space-x-2'>
                                            <img
                                                src={`https://85c2-180-244-129-91.ngrok-free.app/${item.image}`}
                                                alt='menu'
                                                className='rounded-lg w-14 h-14'
                                            />
                                            <div className='flex flex-col'>
                                                <div className='flex flex-row'>
                                                    <div className='overflow-hidden overflow-ellipsis max-w-44'>
                                                        <h4 className='text-sm font-semibold ml-2'>{item.name}</h4>
                                                    </div>
                                                    <div className='absolute top-1 right-3'>
                                                        <button
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                            className='text-red-600 font-semibold'
                                                        >
                                                            x
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-row mt-2'>
                                                    <h5 className='text-xs ml-2'>IDR {item.price.toLocaleString()}</h5>
                                                    <h5 className='text-xs font-semibold ml-5'>{(item.quantity || 1)}x</h5>
                                                    <h5 className='text-xs ml-14'>IDR {(item.price * item.quantity).toLocaleString()}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='pt-2'>
                    <hr className='border-2' />
                </div>
            </div>

            <div className='flex w-full justify-center'>
                <div className='sm:mx-auto sm:w-[83%]'>
                    <div className='border-2 border-gray-100 bg-gray-100 rounded-lg mt-5 overflow-hidden relative'>
                        <div className='flex ml-4 mt-2 mb-2'>
                            <h4 className='font-bold text-black'>Total Amount</h4>
                            <h4 className='ml-28 text-sm'>IDR {totalAmount.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-4'>
                <button
                    onClick={handleCheckout}
                    className='sm:mx-auto sm:w-[83%] font-semibold bg-red-700 text-white py-3 text-center rounded-md'
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}

export default Rightsidebar;
