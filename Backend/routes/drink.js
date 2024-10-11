const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
const upload = require('../utils/uploadFile'); // Tambahkan import untuk upload
const router = express.Router();
const prisma = new PrismaClient();

// Create drink
router.post('/', auth, upload.single('image'), async (req, res) => { // {{ edit_1 }}
  try {
    const { name, details, price, isDessert, isMainCourse } = req.body;
    const image = req.file ? req.file.path : null; // Ambil path gambar jika ada
    const priceFloat = parseFloat(price); // {{ edit_1 }} Konversi price ke Float
    const isDessertBoolean = isDessert === 'true'; // {{ edit_2 }} Konversi isDessert ke Boolean
    const isMainCourseBoolean = isMainCourse === 'true'; // {{ edit_3 }} Konversi isMainCourse ke Boolean

    const newDrink = await prisma.drink.create({
      data: {
        name,
        details,
        price: priceFloat, // Gunakan price yang sudah dikonversi
        isDessert: isDessertBoolean, // Gunakan isDessert yang sudah dikonversi
        isMainCourse: isMainCourseBoolean, // Gunakan isMainCourse yang sudah dikonversi
        image, // Tambahkan field image
        addBy: req.user.id,
      },
    });
    res.json({ isSuccess: true, data: newDrink }); // {{ edit_2 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Gagal menambah minuman', error: error.message }); // Menangani error
  }
});

// Get all drinks
router.get('/', async (req, res) => {
  try {
    const drinks = await prisma.drink.findMany();
    res.json({ isSuccess: true, data: drinks }); // {{ edit_3 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Gagal mendapatkan daftar minuman', error: error.message }); // Menangani error
  }
});

// Add new endpoint to search drinks by name, price, isDessert, and isMainCourse
router.get('/search', async (req, res) => { // {{ edit_1 }}
  try {
    const { name, price, isDessert, isMainCourse, id } = req.query; // Ambil query parameters
    const filters = {}; // Inisialisasi filter
    
    if (id) { // Tambahkan filter untuk id jika ada
      filters.id = parseInt(id); // Konversi id ke integer
    }
    if (name) {
      filters.name = { contains: name, mode: 'insensitive' }; // Filter berdasarkan nama
    }
    if (isDessert) {
      filters.isDessert = isDessert === 'true'; // Konversi ke Boolean
    }
    if (isMainCourse) {
      filters.isMainCourse = isMainCourse === 'true'; // Konversi ke Boolean
    }

    const drinks = await prisma.drink.findMany({
      where: filters,
      orderBy: price ? { price: price === 'asc' ? 'asc' : 'desc' } : undefined, // Urutkan berdasarkan harga
    });

    res.json({ isSuccess: true, data: drinks }); // Kembalikan data minuman
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Gagal mencari minuman', error: error.message }); // Menangani error
  }
});

// Update drink
router.put('/:id', auth, upload.single('image'), async (req, res) => { // {{ edit_4 }}
  try {
    const { id } = req.params;
    const { name, details, price, isDessert, isMainCourse } = req.body;
    console.log(name)
    const image = req.file ? req.file.path : null; // Ambil path gambar jika ada

    // Ambil data minuman yang ada di database
    const existingDrink = await prisma.drink.findUnique({ where: { id: parseInt(id) } });

    const updatedData = {
      name: name !== undefined ? name : existingDrink.name,
      details: details !== undefined ? details : existingDrink.details,
      price: price !== undefined ? parseFloat(price) : existingDrink.price, // Konversi price ke Float jika ada
      isDessert: isDessert !== undefined ? isDessert === 'true' : existingDrink.isDessert, // Konversi ke Boolean jika ada
      isMainCourse: isMainCourse !== undefined ? isMainCourse === 'true' : existingDrink.isMainCourse, // Konversi ke Boolean jika ada
      image: image !== null ? image : existingDrink.image, // Gunakan image yang ada jika tidak ada yang baru
      addBy: existingDrink.addBy, // Tetap menggunakan addBy yang ada
    };

    const updatedDrink = await prisma.drink.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });
    res.json({ isSuccess: true, data: updatedDrink }); // {{ edit_5 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Gagal memperbarui minuman', error: error.message }); // Menangani error
  }
});

// Delete drink
router.delete('/:id', auth, async (req, res) => {
  try {
    const drinkToDelete = await prisma.drink.findUnique({ where: { id: parseInt(req.params.id) } }); // Ambil data minuman yang akan dihapus
    if (drinkToDelete.image) {
      // Hapus file gambar jika ada
      const fs = require('fs');
      fs.unlinkSync(drinkToDelete.image); // {{ edit_6 }} Hapus file gambar
    }
    await prisma.drink.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ isSuccess: true, message: 'Minuman berhasil dihapus' }); // {{ edit_6 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: 'Gagal menghapus minuman', error: error.message }); // Menangani error
  }
});

module.exports = router;
