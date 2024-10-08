import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// data user
import DataUser from './page/Admin/dataUser';
import EditUser from './components/editUser';
import AddUser from './components/addUser';

// data makanan
import DataMakanan from './page/Admin/dataMakanan';
import DataSnack from './components/dataSnack';
import DataCoffee from './components/dataCoffee';
import DataDesserts from './components/dataDesserts';
import DataMainCourse from './components/dataMainCourse';
import EditFood from './components/editFood';
import AddFood from './components/addFood';

// data meja
import DataMeja from './page/Admin/dataMeja';
import EditTable from './components/editTable';
import AddTable from './components/addTable';

import Modal from './components/modal';

import DataTransaksi from './page/Manajer/dataTransaksi';

function App() {
  return (
    <Router> {/* Add Router here */}
      <div className="App">
        {/* Your other code here */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pemesanan" element={<Pemesanan />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/daftar" element={<DaftarTransaksi />} />
        <Route path="/nota" element={<Nota />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/snack" element={<Snack />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/main-course" element={<MainCourse />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/dataUser" element={<DataUser />} />
        <Route path="/dataMakanan" element={<DataMakanan />} />
        <Route path="/dataCoffee" element={<DataCoffee />} />
        <Route path="/dataSnack" element={<DataSnack />} />
        <Route path="/dataDesserts" element={<DataDesserts />} />
        <Route path="/dataMainCourse" element={<DataMainCourse />} />
        <Route path="/editFood" element={<EditFood />} />
        <Route path="/addFood" element={<AddFood />} />
        <Route path="/dataMeja" element={<DataMeja />} />
        <Route path="/editTable" element={<EditTable />} />
        <Route path="/addTable" element={<AddTable />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/dataTransaksi" element={<DataTransaksi />} />
      </Routes>
    </Router>
  );
}

export default App;
