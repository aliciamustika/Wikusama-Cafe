import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MenuContainer from './components/menuContainer';
import Navbar from './components/navbar';
import Login from './page/Kasir/login';
import Signup from './page/Kasir/signup';
import Pemesanan from './page/Kasir/pemesanan';
import DaftarTransaksi from './page/Kasir/daftarTransaksi';
import Nota from './page/Kasir/nota';
import Coffee from './components/coffee';
import Dessert from './components/desserts';
import Snack from './components/snack';
import MainCourse from './components/main-course';
import Edit from './components/edit';
import ConfirmOrder from './components/confirm';
import Rightsidebar from './components/rightsidebar';

// data user
import DataUser from './page/Admin/dataUser';
import EditUser from './components/editUser';
import AddUser from './components/addUser';

// data menu
import DataMenu from './page/Admin/dataMenu';
import DataSnack from './components/dataSnack';
import DataCoffee from './components/dataCoffee';
import DataDesserts from './components/dataDesserts';
import DataMainCourse from './components/dataMainCourse';
import EditFood from './components/editFood';
import EditDrink from './components/editDrink';
import AddFood from './components/addFood';
import AddDrink from './components/addDrink';
import AddMenu from './components/addMenu';

// data meja
import DataMeja from './page/Admin/dataMeja';
import EditTable from './components/editTable';
import AddTable from './components/addTable';

import Modal from './components/modal';

import DataTransaksi from './page/Manajer/dataTransaksi';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [customerData, setCustomerData] = useState({});

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const handleCustomerUpdate = (newCustomerData) => {
    setCustomerData(newCustomerData);
  };

  return (
    <Router>
      {/* <div className="app">
          <Coffee />
          <Rightsidebar />
        </div> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* <Route path="/pemesanan" element={
          <div style={{ display: 'flex' }}>
            <Pemesanan setCartItems={setCartItems} setCustomerData={setCustomerData} />
            <Rightsidebar cartItems={cartItems} setCartItems={setCartItems} customerData={customerData}/>
          </div>
        } />     */}

        <Route path="/pemesanan" element={<Pemesanan cartItems={cartItems} setCartItems={setCartItems} customerData={customerData} />} />
        <Route path="/rightsidebar " element={<Rightsidebar cartItems={cartItems} setCartItems={setCartItems} customerData={customerData} />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/daftar" element={<DaftarTransaksi />} />
        <Route path="/nota/:idTransaksi" element={<Nota />} />
        <Route path="/edit" element={<Edit setCustomerData={setCustomerData} />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/snack" element={<Snack />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/main-course" element={<MainCourse />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/dataUser" element={<DataUser />} />
        <Route path="/dataMenu" element={<DataMenu />} />
        <Route path="/dataCoffee" element={<DataCoffee />} />
        <Route path="/dataSnack" element={<DataSnack />} />
        <Route path="/dataDesserts" element={<DataDesserts />} />
        <Route path="/dataMainCourse" element={<DataMainCourse />} />
        <Route path="/editFood/:id" element={<EditFood />} />
        <Route path="/editDrink/:id" element={<EditDrink />} />
        <Route path="/addFood" element={<AddFood />} />
        <Route path="/addDrink" element={<AddDrink />} />
        <Route path="/addMenu" element={<AddMenu />} />
        <Route path="/dataMeja" element={<DataMeja />} />
        <Route path="/editTable/:id" element={<EditTable />} />
        <Route path="/addTable" element={<AddTable />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/dataTransaksi" element={<DataTransaksi />} />
      </Routes>
    </Router>
  );
}

export default App;
