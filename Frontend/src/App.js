import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './page/Kasir/login';
import Pemesanan from './page/Kasir/pemesanan';
import DaftarTransaksi from './page/Kasir/daftarTransaksi';
import Nota from './page/Kasir/nota';
import Coffee from './components/coffee';
import Dessert from './components/desserts';
import Snack from './components/snack';
import MainCourse from './components/main-course';
import Edit from './components/edit';
import ConfirmOrder from './components/confirm';

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
      </Routes>
    </Router>
  );
}

export default App;
