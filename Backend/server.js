// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const dotenv = require('dotenv'); // dotenv untuk mengelola variabel lingkungan
const cors = require('cors'); // CORS untuk mengatur Cross-Origin Resource Sharing
const path = require('path'); // Path untuk menangani path file sistem

// Mengonfigurasi dotenv untuk mengakses variabel lingkungan
dotenv.config(); 

// Membuat instance aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS untuk memungkinkan permintaan dari domain lain
app.use(express.json()); // Menggunakan express.json() untuk parsing body request dalam format JSON
app.use(express.urlencoded({ extended: true })); // Menggunakan express.urlencoded() untuk parsing body request dari form URL encoded

// Mengimpor route untuk berbagai resource
const authRoutes = require('./routes/auth'); // Route untuk otentikasi
const foodRoutes = require('./routes/food'); // Route untuk makanan
const drinkRoutes = require('./routes/drink'); // Route untuk minuman
const tableRoutes = require('./routes/table'); // Route untuk meja
const transactionRoutes = require('./routes/transaction'); // Route untuk transaksi
const userRoutes = require('./routes/user');  // Route untuk pengguna

// Menggunakan route pada aplikasi
app.use('/api/auth', authRoutes); // Menyambungkan route auth pada endpoint /api/auth
app.use('/api/food', foodRoutes); // Menyambungkan route food pada endpoint /api/food
app.use('/api/drink', drinkRoutes); // Menyambungkan route drink pada endpoint /api/drink
app.use('/api/table', tableRoutes); // Menyambungkan route table pada endpoint /api/table
app.use('/api/transaction', transactionRoutes); // Menyambungkan route transaction pada endpoint /api/transaction
app.use('/api/user', userRoutes); // Menyambungkan route user pada endpoint /api/user

// Menyajikan file statis (seperti gambar) dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Mengakses folder uploads untuk file statis

// Menentukan port untuk server (dari variabel lingkungan atau default 5000)
const PORT = process.env.PORT || 5000; 

// Menjalankan server pada port yang ditentukan dan menampilkan pesan di console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Mengirim pesan ke console saat server berjalan
