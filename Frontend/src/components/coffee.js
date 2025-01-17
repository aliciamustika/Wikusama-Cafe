import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Coffee({ addToCart }) {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        axios.get('https://85c2-180-244-129-91.ngrok-free.app/api/drink')
            .then(response => {
                console.log(response.data);
                const filteredDrinks = response.data.data.filter(drink => drink.isMainCourse);
                setDrinks(filteredDrinks);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='flex flex-col w-[721px]'>
            <div className='flex flex-wrap justify-start'>
                {drinks.map(drink => (
                    <div key={drink.id} className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-5'>
                        <img
                            src={`https://85c2-180-244-129-91.ngrok-free.app/${drink.image}`}
                            alt={drink.name}
                            className='w-44 h-36 mt-3 mb-2 rounded-lg'
                        />
                        <div className='w-full'>
                            <h3 className='font-bold text-base text-left ml-3 w-full'>{drink.name}</h3>
                            <p className='text-left w-[190px] h-8 overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>{drink.details}</p>
                            <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR {drink.price.toLocaleString()}</p>
                            <div className='flex justify-center'>
                                <button
                                    onClick={() => addToCart(drink)}
                                    className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-5'>
                                <img
                                    src='img/coffee-misshim.jpeg'
                                    alt=''
                                    className='w-44 h-36 mt-3 mb-2 rounded-lg'
                                />
                                <div className='w-full'>
                                    <h3 className='font-bold text-base text-left ml-3 w-full'>Charlatte</h3>
                                    <p className='text-left w-full overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                                        Espresso dengan susu panas dan sedikit foam di atasnya.
                                    </p>
                                    <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                                    <div className='flex justify-center'>
                                        <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-5'>
                                <img
                                    src='img/coffee-misshim.jpeg'
                                    alt=''
                                    className='w-44 h-36 mt-3 mb-2 rounded-lg'
                                />
                                <div className='w-full'>
                                    <h3 className='font-bold text-base text-left ml-3 w-full'>Charlatte</h3>
                                    <p className='text-left w-full overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                                        Espresso dengan susu panas dan sedikit foam di atasnya.
                                    </p>
                                    <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                                    <div className='flex justify-center'>
                                        <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col bg-white w-full sm:w-[48%] md:w-[29%] h-auto rounded-lg shadow-lg items-center m-1 ml-5'>
                                <img
                                    src='img/coffee-misshim.jpeg'
                                    alt=''
                                    className='w-44 h-36 mt-3 mb-2 rounded-lg'
                                />
                                <div className='w-full'>
                                    <h3 className='font-bold text-base text-left ml-3 w-full'>Charlatte</h3>
                                    <p className='text-left w-full overflow-hidden overflow-ellipsis whitespace-nowrap md:whitespace-normal text-xs ml-3'>
                                        Espresso dengan susu panas dan sedikit foam di atasnya.
                                    </p>
                                    <p className='text-end mr-2 mt-3 text-xs font-semibold'>IDR 0.000</p>
                                    <div className='flex justify-center'>
                                        <button className='mt-3 mb-4 sm:w-[85%] bg-red-700 text-white font-medium text-sm py-2 px-4 rounded'>Add to Dish</button>
                                    </div>
                                </div>
                            </div> */}

            </div>
        </div>

    );
}

export default Coffee;