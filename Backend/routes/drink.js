// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const auth = require('../middlewares/auth'); // Middleware untuk otentikasi
const upload = require('../utils/uploadFile'); // Middleware untuk mengupload file
const router = express.Router(); // Router untuk menangani route Express
const prisma = require('../utils/db'); // Prisma Client instance untuk query database

/**
 * Endpoint untuk membuat minuman baru.
 * Mengambil data dari request body dan menyimpannya ke dalam database.
 * Menyertakan opsi untuk mengupload gambar minuman.
 *
 * @param {string} name - Nama minuman
 * @param {string} details - Deskripsi minuman
 * @param {number} price - Harga minuman
 * @param {boolean} isDessert - Apakah minuman ini adalah pencuci mulut
 * @param {boolean} isMainCourse - Apakah minuman ini adalah hidangan utama
 * @param {file} image - Gambar minuman (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data minuman yang baru dibuat
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Mengambil data dari body request dan file gambar
    const { name, details, price, isDessert, isMainCourse } = req.body;
    const image = req.file ? req.file.path : null; // Menyimpan path file gambar jika ada
    const priceFloat = parseFloat(price); // Mengonversi harga menjadi float
    const isDessertBoolean = isDessert === 'true'; // Mengonversi status dessert menjadi boolean
    const isMainCourseBoolean = isMainCourse === 'true'; // Mengonversi status main course menjadi boolean

    // Menyimpan data minuman baru ke dalam database
    const newDrink = await prisma.drink.create({
      data: {
        name, // Nama minuman
        details, // Deskripsi minuman
        price: priceFloat, // Harga minuman
        isDessert: isDessertBoolean, // Status dessert
        isMainCourse: isMainCourseBoolean, // Status main course
        image, // Path gambar minuman
        addBy: req.user.id, // ID pengguna yang menambahkan minuman
      },
    });

    // Mengirimkan response sukses dengan data minuman yang baru dibuat
    res.json({ isSuccess: true, data: newDrink });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menambah minuman', error: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan semua minuman.
 * Mengambil semua data minuman dari database tanpa filter.
 * 
 * @returns {Object} JSON yang berisi status dan daftar semua minuman
 */
router.get('/', async (req, res) => {
  try {
    // Mengambil semua data minuman dari database
    const drinks = await prisma.drink.findMany();
    res.json({ isSuccess: true, data: drinks });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mendapatkan daftar minuman', error: error.message });
  }
});

/**
 * Endpoint untuk mencari minuman berdasarkan filter (name, price, isDessert, isMainCourse).
 * Mendukung filter berdasarkan nama, harga, dan jenis minuman (dessert dan main course).
 * 
 * @param {string} name - Nama minuman untuk filter (opsional)
 * @param {number} price - Harga minuman untuk filter (opsional)
 * @param {boolean} isDessert - Apakah minuman ini adalah pencuci mulut (opsional)
 * @param {boolean} isMainCourse - Apakah minuman ini adalah hidangan utama (opsional)
 * @param {number} id - ID minuman untuk filter (opsional)
 * 
 * @returns {Object} JSON yang berisi status dan hasil pencarian minuman
 */
router.get('/search', async (req, res) => {
  try {
    const { name, price, isDessert, isMainCourse, id } = req.query; // Mengambil query parameters
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

    // Mengambil data minuman dari database berdasarkan filter dan harga
    const drinks = await prisma.drink.findMany({
      where: filters, // Filter pencarian
      orderBy: price ? { price: price === 'asc' ? 'asc' : 'desc' } : undefined, // Urutkan berdasarkan harga (jika ada)
    });

    // Mengirimkan response dengan hasil pencarian minuman
    res.json({ isSuccess: true, data: drinks });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mencari minuman', error: error.message });
  }
});

/**
 * Endpoint untuk memperbarui data minuman berdasarkan ID.
 * Mengambil data dari request body dan memperbarui minuman yang ada di database.
 * Menyertakan opsi untuk mengupload gambar baru jika diperlukan.
 *
 * @param {number} id - ID minuman yang ingin diperbarui
 * @param {string} name - Nama minuman baru
 * @param {string} details - Deskripsi minuman baru
 * @param {number} price - Harga minuman baru
 * @param {boolean} isDessert - Apakah minuman ini adalah pencuci mulut
 * @param {boolean} isMainCourse - Apakah minuman ini adalah hidangan utama
 * @param {file} image - Gambar baru minuman (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data minuman yang diperbarui
 */
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID minuman dari URL
    const { name, details, price, isDessert, isMainCourse } = req.body;
    const image = req.file ? req.file.path : null; // Mengambil gambar baru jika ada

    // Mengambil data minuman yang ada di database
    const existingDrink = await prisma.drink.findUnique({ where: { id: parseInt(id) } });

    // Menyusun data yang akan diperbarui
    const updatedData = {
      name: name !== undefined ? name : existingDrink.name, // Nama baru atau tetap
      details: details !== undefined ? details : existingDrink.details, // Deskripsi baru atau tetap
      price: price !== undefined ? parseFloat(price) : existingDrink.price, // Harga baru atau tetap
      isDessert: isDessert !== undefined ? isDessert === 'true' : existingDrink.isDessert, // Status dessert
      isMainCourse: isMainCourse !== undefined ? isMainCourse === 'true' : existingDrink.isMainCourse, // Status main course
      image: image !== null ? image : existingDrink.image, // Gambar baru atau tetap
      addBy: existingDrink.addBy, // Tetap menggunakan addBy yang ada
    };

    // Memperbarui data minuman di database
    const updatedDrink = await prisma.drink.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    // Mengirimkan response dengan data minuman yang diperbarui
    res.json({ isSuccess: true, data: updatedDrink });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal memperbarui minuman', error: error.message });
  }
});

/**
 * Endpoint untuk menghapus minuman berdasarkan ID.
 * Menghapus minuman dan menghapus file gambar terkait jika ada.
 *
 * @param {number} id - ID minuman yang ingin dihapus
 * 
 * @returns {Object} JSON yang berisi status dan pesan hasil penghapusan minuman
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Mencari minuman yang ingin dihapus berdasarkan ID
    const drinkToDelete = await prisma.drink.findUnique({ where: { id: parseInt(req.params.id) } });

    // Jika minuman memiliki gambar, hapus file gambar tersebut
    if (drinkToDelete.image) {
      const fs = require('fs'); // Mengimpor modul file system untuk menghapus file
      fs.unlinkSync(drinkToDelete.image); // Menghapus file gambar dari server
    }

    // Menghapus minuman dari database
    await prisma.drink.delete({ where: { id: parseInt(req.params.id) } });

    // Mengirimkan response sukses setelah penghapusan
    res.status(200).json({ isSuccess: true, message: 'Minuman berhasil dihapus' });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menghapus minuman', error: error.message });
  }
});

module.exports = router; // Mengekspor router untuk digunakan di file lain
