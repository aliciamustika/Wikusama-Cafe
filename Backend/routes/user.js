// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const { PrismaClient } = require('@prisma/client'); // PrismaClient untuk berinteraksi dengan database
const auth = require('../middlewares/auth'); // Middleware untuk otentikasi
const router = express.Router(); // Router untuk menangani route Express
const prisma = new PrismaClient(); // Prisma Client instance untuk query database
const upload = require('../utils/uploadFile'); // Middleware untuk mengupload file
const fs = require('fs'); // Modul file system untuk menghapus file gambar
const bcrypt = require('bcrypt'); // Bcrypt untuk enkripsi password

/**
 * Helper function untuk memeriksa apakah user memiliki izin berdasarkan role.
 *
 * @param {Request} req - Request object, yang berisi informasi user
 * @param {Array} roles - Array yang berisi role yang diizinkan
 * 
 * @returns {boolean} - Mengembalikan true jika user memiliki role yang sesuai, false jika tidak
 */
const checkRole = (req, roles) => roles.includes(req.user.role);

/**
 * Endpoint untuk membuat pengguna baru.
 * Hanya admin yang dapat membuat pengguna dengan role manager,
 * dan admin serta manager dapat membuat pengguna dengan role cashier.
 * 
 * @param {string} username - Nama pengguna
 * @param {string} password - Password pengguna yang akan dienkripsi
 * @param {string} role - Role pengguna (admin, manager, cashier)
 * @param {file} image - Gambar pengguna (opsional)
 * 
 * @returns {Object} JSON yang berisi status dan data pengguna yang baru dibuat
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { username, password, role } = req.body; // Mengambil data dari body request

    // Validasi input
    if (!username || !password || !role) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Hapus gambar jika ada dan input tidak valid
      }
      return res.status(400).json({ isSuccess: false, error: 'Username, password, and role are required.' });
    }

    // Memeriksa apakah username sudah ada
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Hapus gambar jika username sudah ada
      }
      return res.status(409).json({ isSuccess: false, error: 'Username already exists.' });
    }

    const image = req.file ? req.file.path : null; // Menyimpan path gambar jika ada

    // Validasi role berdasarkan hak akses pengguna yang sedang login
    if (role === 'manager' && req.user.role !== 'admin') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ isSuccess: false, error: 'Only admins can add managers.' });
    }
    if (role === 'cashier' && !checkRole(req, ['admin', 'manager'])) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ isSuccess: false, error: 'Only admins and managers can add cashiers.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Enkripsi password
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword, // Menyimpan password yang telah dienkripsi
        role,
        image,
        addBy: req.user.id, // ID pengguna yang membuat pengguna baru
      },
    });

    res.json({ isSuccess: true, data: newUser }); // Mengirimkan data pengguna baru
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path); // Hapus gambar jika ada kesalahan
    }
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan semua pengguna.
 * Hanya admin yang dapat melihat daftar pengguna.
 * 
 * @returns {Object} JSON yang berisi status dan daftar pengguna
 */
router.get('/', auth, async (req, res) => {
  try {
    if (!checkRole(req, ['admin'])) {
      return res.status(403).json({ isSuccess: false, error: 'Only admins can view users.' });
    }

    const users = await prisma.user.findMany();
    res.json({ isSuccess: true, data: users });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan pengguna berdasarkan ID.
 * 
 * @param {number} id - ID pengguna yang ingin diambil
 * 
 * @returns {Object} JSON yang berisi status dan data pengguna
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID pengguna dari parameter URL
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user) return res.status(404).json({ isSuccess: false, error: 'User not found' });

    res.json({ isSuccess: true, data: user });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message });
  }
});

/**
 * Endpoint untuk memperbarui data pengguna.
 * Admin dapat memperbarui siapa saja, sedangkan manager hanya bisa memperbarui cashier.
 * 
 * @param {number} id - ID pengguna yang ingin diperbarui
 * @param {string} username - Nama pengguna baru
 * @param {string} password - Password baru (opsional)
 * @param {string} role - Role baru
 * @param {file} image - Gambar baru pengguna (opsional)
 * 
 * @returns {Object} JSON yang berisi status dan data pengguna yang diperbarui
 */
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const userToUpdate = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!userToUpdate) return res.status(404).json({ isSuccess: false, error: 'User not found' });

    // Validasi hak akses berdasarkan role
    if (userToUpdate.role === 'manager' && req.user.role !== 'admin') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ isSuccess: false, error: 'Only admins can update managers.' });
    }
    if (userToUpdate.role === 'cashier' && !checkRole(req, ['admin', 'manager'])) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ isSuccess: false, error: 'Only admins and managers can update cashiers.' });
    }

    const image = req.file ? req.file.path : userToUpdate.image;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : userToUpdate.password; // Enkripsi password jika ada

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username,
        password: hashedPassword, // Menyimpan password yang telah dienkripsi
        role,
        image,
      },
    });

    res.json({ isSuccess: true, data: updatedUser });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message });
  }
});

/**
 * Endpoint untuk menghapus pengguna berdasarkan ID.
 * Admin dapat menghapus manager dan cashier, sedangkan manager hanya bisa menghapus cashier.
 * 
 * @param {number} id - ID pengguna yang ingin dihapus
 * 
 * @returns {Object} JSON yang berisi status dan pesan hasil penghapusan pengguna
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!userToDelete) return res.status(404).json({ isSuccess: false, error: 'User not found' });

    // Validasi hak akses berdasarkan role
    if (userToDelete.role === 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ isSuccess: false, error: 'Only admins can delete managers.' });
    }
    if (userToDelete.role === 'cashier' && !checkRole(req, ['admin', 'manager'])) {
      return res.status(403).json({ isSuccess: false, error: 'Only admins and managers can delete cashiers.' });
    }

    // Hapus gambar jika ada
    if (userToDelete.image) {
      fs.unlinkSync(userToDelete.image);
    }

    await prisma.user.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ isSuccess: true, message: 'User has been successfully deleted.' });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message });
  }
});

module.exports = router; // Mengekspor router agar bisa digunakan di file lain
