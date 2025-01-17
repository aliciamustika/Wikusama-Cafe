import React, { useState } from 'react';
import Rightsidebar from './rightsidebar';
import Edit from './edit';

function OrderManagement() {
    const [cartItems, setCartItems] = useState([]);
    const [customerData, setCustomerData] = useState({
        name: 'Charlotte',
        table: '',
    });

    return (
        <div className="flex">
            <Edit setCustomerData={setCustomerData} />
            <Rightsidebar cartItems={cartItems} setCartItems={setCartItems} customerData={customerData} />
        </div>
    );
}

export default OrderManagement;