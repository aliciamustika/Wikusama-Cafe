// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const auth = require('../middlewares/auth'); // Middleware untuk otentikasi
const upload = require('../utils/uploadFile'); // Middleware untuk mengupload file
const router = express.Router(); // Router untuk menangani route Express
const prisma = require('../utils/db'); // Prisma Client instance untuk query database

/**
 * Endpoint untuk membuat makanan baru.
 * Mengambil data dari request body dan menyimpannya ke dalam database.
 * Menyertakan opsi untuk mengupload gambar makanan.
 *
 * @param {string} name - Nama makanan
 * @param {string} details - Deskripsi makanan
 * @param {number} price - Harga makanan
 * @param {boolean} isDessert - Apakah makanan ini adalah pencuci mulut
 * @param {boolean} isMainCourse - Apakah makanan ini adalah hidangan utama
 * @param {boolean} isSnack - Apakah makanan ini adalah camilan
 * @param {file} image - Gambar makanan (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data makanan yang baru dibuat
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Mengambil data dari body request dan file gambar
    const { name, details, price, isDessert, isMainCourse, isSnack } = req.body;
    const image = req.file ? req.file.path : null; // Menyimpan path file gambar jika ada
    const priceFloat = parseFloat(price); // Mengonversi harga menjadi float
    const isDessertBoolean = isDessert === 'true'; // Mengonversi status dessert menjadi boolean
    const isMainCourseBoolean = isMainCourse === 'true'; // Mengonversi status main course menjadi boolean
    const isSnackBoolean = isSnack === 'true'; // Mengonversi status snack menjadi boolean

    // Menyimpan data makanan baru ke dalam database
    const newFood = await prisma.food.create({
      data: {
        name, // Nama makanan
        details, // Deskripsi makanan
        image, // Path gambar makanan
        price: priceFloat, // Harga makanan
        isDessert: isDessertBoolean, // Status dessert
        isMainCourse: isMainCourseBoolean, // Status main course
        isSnack: isSnackBoolean, // Status snack
        addBy: req.user.id, // ID pengguna yang menambahkan makanan
      },
    });

    // Mengirimkan response sukses dengan data makanan yang baru dibuat
    res.json({ isSuccess: true, data: newFood });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menambah makanan', error: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan semua makanan.
 * Mengambil semua data makanan dari database tanpa filter.
 * 
 * @returns {Object} JSON yang berisi status dan daftar semua makanan
 */
router.get('/', async (req, res) => {
  try {
    // Mengambil semua data makanan dari database
    const foods = await prisma.food.findMany();
    res.json({ isSuccess: true, data: foods });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mendapatkan daftar makanan', error: error.message });
  }
});

/**
 * Endpoint untuk mencari makanan berdasarkan filter (name, price, isDessert, isMainCourse, isSnack).
 * Mendukung filter berdasarkan nama, harga, dan jenis makanan (dessert, main course, snack).
 * 
 * @param {string} name - Nama makanan untuk filter (opsional)
 * @param {number} price - Harga makanan untuk filter (opsional)
 * @param {boolean} isDessert - Apakah makanan adalah pencuci mulut (opsional)
 * @param {boolean} isMainCourse - Apakah makanan adalah hidangan utama (opsional)
 * @param {boolean} isSnack - Apakah makanan adalah camilan (opsional)
 * @param {number} id - ID makanan untuk filter (opsional)
 * 
 * @returns {Object} JSON yang berisi status dan hasil pencarian makanan
 */
router.get('/search', async (req, res) => {
  try {
    const { name, price, isDessert, isMainCourse, isSnack, id } = req.query; // Mengambil query parameters
    const filters = {}; // Inisialisasi filter
    
    // Menambahkan filter berdasarkan ID jika ada
    if (id) {
      filters.id = parseInt(id); // Mengonversi id ke integer
    }
    // Menambahkan filter berdasarkan nama jika ada
    if (name) {
      filters.name = { contains: name, mode: 'insensitive' }; // Filter berdasarkan nama (case insensitive)
    }
    // Menambahkan filter berdasarkan isDessert jika ada
    if (isDessert) {
      filters.isDessert = isDessert === 'true'; // Mengonversi ke boolean
    }
    // Menambahkan filter berdasarkan isMainCourse jika ada
    if (isMainCourse) {
      filters.isMainCourse = isMainCourse === 'true'; // Mengonversi ke boolean
    }
    // Menambahkan filter berdasarkan isSnack jika ada
    if (isSnack) {
      filters.isSnack = isSnack === 'true'; // Mengonversi ke boolean
    }

    // Mengambil data makanan dari database berdasarkan filter dan harga
    const foods = await prisma.food.findMany({
      where: filters, // Filter pencarian
      orderBy: price ? { price: price === 'asc' ? 'asc' : 'desc' } : undefined, // Urutkan berdasarkan harga (jika ada)
    });

    // Mengirimkan response dengan hasil pencarian makanan
    res.json({ isSuccess: true, data: foods });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mencari makanan', error: error.message });
  }
});

/**
 * Endpoint untuk memperbarui data makanan berdasarkan ID.
 * Mengambil data dari request body dan memperbarui makanan yang ada di database.
 * Menyertakan opsi untuk mengupload gambar baru jika diperlukan.
 *
 * @param {number} id - ID makanan yang ingin diperbarui
 * @param {string} name - Nama makanan baru
 * @param {string} details - Deskripsi makanan baru
 * @param {number} price - Harga makanan baru
 * @param {boolean} isDessert - Apakah makanan ini adalah pencuci mulut
 * @param {boolean} isMainCourse - Apakah makanan ini adalah hidangan utama
 * @param {boolean} isSnack - Apakah makanan ini adalah camilan
 * @param {file} image - Gambar baru makanan (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data makanan yang diperbarui
 */
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID makanan dari URL
    const { name, details, price, isDessert, isMainCourse, isSnack } = req.body;
    const image = req.file ? req.file.path : null; // Mengambil gambar baru jika ada

    // Mengambil data makanan yang ada di database
    const existingFood = await prisma.food.findUnique({ where: { id: parseInt(id) } });

    // Menyusun data yang akan diperbarui
    const updatedData = {
      name: name !== undefined ? name : existingFood.name, // Nama baru atau tetap
      details: details !== undefined ? details : existingFood.details, // Deskripsi baru atau tetap
      price: price !== undefined ? parseFloat(price) : existingFood.price, // Harga baru atau tetap
      isDessert: isDessert !== undefined ? isDessert === 'true' : existingFood.isDessert, // Status dessert
      isMainCourse: isMainCourse !== undefined ? isMainCourse === 'true' : existingFood.isMainCourse, // Status main course
      isSnack: isSnack !== undefined ? isSnack === 'true' : existingFood.isSnack, // Status snack
      image: image !== null ? image : existingFood.image, // Gambar baru atau tetap
      addBy: existingFood.addBy, // Menyimpan ID pengguna yang menambahkan
    };

    // Memperbarui data makanan di database
    const updatedFood = await prisma.food.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    // Mengirimkan response dengan data makanan yang diperbarui
    res.json({ isSuccess: true, data: updatedFood });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal memperbarui makanan', error: error.message });
  }
});

/**
 * Endpoint untuk menghapus makanan berdasarkan ID.
 * Menghapus makanan dan menghapus file gambar terkait jika ada.
 *
 * @param {number} id - ID makanan yang ingin dihapus
 * 
 * @returns {Object} JSON yang berisi status dan pesan hasil penghapusan makanan
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Mencari makanan yang ingin dihapus berdasarkan ID
    const foodToDelete = await prisma.food.findUnique({ where: { id: parseInt(req.params.id) } });

    // Jika makanan memiliki gambar, hapus file gambar tersebut
    if (foodToDelete.image) {
      const fs = require('fs'); // Mengimpor modul file system untuk menghapus file
      fs.unlinkSync(foodToDelete.image); // Menghapus file gambar dari server
    }

    // Menghapus makanan dari database
    await prisma.food.delete({ where: { id: parseInt(req.params.id) } });

    // Mengirimkan response sukses setelah penghapusan
    res.status(200).json({ isSuccess: true, message: 'Makanan berhasil dihapus' });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menghapus makanan', error: error.message });
  }
});

module.exports = router; // Mengekspor router untuk digunakan di file lain
