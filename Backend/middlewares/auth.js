// Mengimpor dependensi yang dibutuhkan
const jwt = require('jsonwebtoken'); // JSON Web Token untuk verifikasi dan pembuatan token
const express = require('express'); // Express untuk routing dan server
const app = express(); // Inisialisasi aplikasi Express

// Middleware untuk parsing body request
app.use(express.json()); // Middleware untuk parsing body request dalam format JSON
// Pastikan middleware ini ada sebelum middleware auth, karena auth memerlukan data yang sudah di-parse

/**
 * Middleware autentikasi untuk memverifikasi token JWT.
 * Memeriksa token yang ada di header Authorization, memverifikasi, dan menambahkan informasi pengguna ke request.
 * 
 * @param {Request} req - Request object, yang berisi header Authorization
 * @param {Response} res - Response object untuk mengirimkan respons kembali ke klien
 * @param {Function} next - Fungsi untuk melanjutkan ke middleware berikutnya jika token valid
 * 
 * @returns {Response} - Mengembalikan status 401 jika token tidak ada atau tidak valid
 */
const auth = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header('Authorization')?.split(' ')[1]; // Mengambil token setelah kata "Bearer"
  
  // Jika token tidak ada, mengirimkan respons 'Access denied'
  if (!token) return res.status(401).send('Access denied');

  try {
    // Memverifikasi token menggunakan JWT_SECRET dari environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Jika verifikasi gagal, mengirimkan respons 'Token verification failed'
    if (!verified) return res.status(401).send('Token verification failed');
    
    // Menyimpan data pengguna yang telah terverifikasi di request user
    req.user = verified;
    
    // Melanjutkan ke middleware berikutnya jika token valid
    next();
  } catch (err) {
    // Jika terjadi error selama verifikasi, mengirimkan respons 'Invalid token'
    res.status(400).send('Invalid token');
  }
};

// Mengekspor middleware agar dapat digunakan di file lain
module.exports = auth;
