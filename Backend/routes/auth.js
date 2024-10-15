// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const bcrypt = require('bcryptjs'); // Bcrypt untuk hash password dan validasi
const jwt = require('jsonwebtoken'); // JWT untuk membuat token otentikasi
const { PrismaClient } = require('@prisma/client'); // PrismaClient untuk interaksi dengan database
const router = express.Router(); // Router untuk menangani route Express
const prisma = new PrismaClient(); // Prisma Client instance untuk query database

/**
 * Endpoint untuk registrasi pengguna baru.
 * Mengambil data dari request body, melakukan hash pada password, dan menyimpan pengguna ke dalam database.
 * 
 * @param {string} username - Nama pengguna
 * @param {string} password - Password pengguna yang akan di-hash
 * @param {string} role - Role pengguna (misalnya 'admin', 'user', dll.)
 * @param {string} image - URL gambar pengguna (opsional)
 * 
 * @returns {Object} JSON yang berisi data pengguna baru yang telah terdaftar
 */
router.post('/register', async (req, res) => {
  const { username, password, role, image } = req.body;

  // Melakukan hashing pada password dengan salt rounds 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Menyimpan pengguna baru ke dalam database menggunakan Prisma
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword, // Menyimpan password yang telah di-hash
      role,
      image,
    },
  });

  // Mengirimkan respons sukses dengan data pengguna yang baru dibuat
  res.json(newUser);
});

/**
 * Endpoint untuk login pengguna.
 * Memeriksa apakah username dan password yang diberikan valid dan sesuai dengan data di database.
 * Jika valid, menghasilkan JWT token untuk otentikasi lebih lanjut.
 * 
 * @param {string} username - Nama pengguna untuk login
 * @param {string} password - Password pengguna untuk login
 * 
 * @returns {Object} JSON yang berisi token JWT dan data pengguna jika login berhasil
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validasi jika username atau password tidak diberikan
  if (!username || !password) return res.status(400).json({ isSuccess: false, error: 'Username & Password is required' });

  // Mencari pengguna berdasarkan username
  const user = await prisma.user.findUnique({ where: { username } });
  
  // Jika pengguna tidak ditemukan, kembalikan error
  if (!user) return res.status(400).json({ isSuccess: false, error: 'User not found' });

  // Memeriksa apakah password yang dimasukkan cocok dengan password yang tersimpan di database
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ isSuccess: false, error: 'Invalid password' });

  // Membuat dan menandatangani JWT dengan ID pengguna dan role, dan masa berlaku 24 jam
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

  // Mengirimkan respons sukses dengan token dan data pengguna
  res.json({ isSuccess: true, token, user });
});

/**
 * Middleware untuk menangani kesalahan yang tidak tertangani di seluruh rute.
 * Ini akan menangkap error dan memberikan response error kepada klien.
 *
 * @param {Error} err - Error yang dilempar oleh aplikasi
 * @param {Request} req - Request yang menyebabkan error
 * @param {Response} res - Response yang dikirimkan ke klien
 * @param {Function} next - Fungsi untuk melanjutkan ke middleware berikutnya
 */
router.use((err, req, res, next) => {
  console.error(err.stack); // Mencetak stack trace error untuk debugging
  res.status(500).json({ isSuccess: false, error: 'Something went wrong!' }); // Mengirimkan respons error dengan status 500
});

module.exports = router; // Mengekspor router agar bisa digunakan di file lain
