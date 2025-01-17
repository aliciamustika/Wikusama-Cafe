import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddMenu() {
    return (
        <div className="flex justify-center items-center min-h-screen container mx-auto">
            <div>
                <Link to='/addFood'>
                    <button
                        type="button"
                        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Add Food
                    </button>
                </Link>

                <Link to='/addDrink'>
                    <button
                        type="button"
                        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Add Drink
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AddMenu;