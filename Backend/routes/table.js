// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const auth = require('../middlewares/auth'); // Middleware untuk otentikasi
const upload = require('../utils/uploadFile'); // Middleware untuk mengupload file
const router = express.Router(); // Router untuk menangani route Express
const prisma = require('../utils/db'); // Prisma Client instance untuk query database

/**
 * Endpoint untuk membuat meja baru.
 * Mengambil data dari request body dan menyimpannya ke dalam database.
 * Menyertakan opsi untuk mengupload gambar meja.
 *
 * @param {string} number - Nomor meja
 * @param {string} isEmpty - Status apakah meja kosong ('true' atau 'false')
 * @param {file} image - Gambar meja (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data meja yang baru dibuat
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Mengambil data dari body request dan file gambar
    const { number, isEmpty } = req.body;
    const image = req.file ? req.file.path : null; // Menyimpan path file gambar jika ada
    const isEmptyBoolean = isEmpty === 'true'; // Mengubah isEmpty menjadi boolean

    // Menyimpan meja baru ke dalam database
    const newTable = await prisma.table.create({
      data: {
        number: parseInt(number), // Mengubah nomor meja menjadi integer
        isEmpty: isEmptyBoolean, // Status apakah meja kosong
        image, // Menyimpan gambar meja jika ada
        addBy: req.user.id, // ID pengguna yang membuat meja
      },
    });

    // Mengirimkan response sukses dengan data meja yang baru dibuat
    res.json({ isSuccess: true, data: newTable });
  } catch(error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menambah meja', error: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan semua meja.
 * Mengambil semua data meja dari database tanpa filter.
 * 
 * @returns {Object} JSON yang berisi status dan daftar semua meja
 */
router.get('/', async (req, res) => {
  try {
    // Mengambil semua data meja dari database
    const tables = await prisma.table.findMany();
    res.json({ isSuccess: true, data: tables });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mendapatkan daftar meja', error: error.message });
  }
});

/**
 * Endpoint untuk mendapatkan semua meja yang kosong (isEmpty = true).
 * Mengambil data meja yang memiliki status isEmpty = true dari database.
 *
 * @returns {Object} JSON yang berisi status dan daftar meja yang kosong
 */
router.get('/empty', async (req, res) => {
  try {
    // Mengambil semua data meja yang kosong dari database
    const tables = await prisma.table.findMany({
      where: {
        isEmpty: true // Filter hanya untuk meja yang kosong
      }
    });
    res.json({ isSuccess: true, data: tables });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal mencari meja kosong', error: error.message });
  }
});

/**
 * Endpoint untuk memperbarui data meja berdasarkan ID.
 * Mengambil data dari request body dan memperbarui meja yang ada di database.
 * Menyertakan opsi untuk mengupload gambar baru jika diperlukan.
 *
 * @param {number} id - ID meja yang ingin diperbarui
 * @param {string} number - Nomor meja baru
 * @param {string} isEmpty - Status apakah meja kosong ('true' atau 'false')
 * @param {file} image - Gambar baru meja (jika ada)
 * 
 * @returns {Object} JSON yang berisi status dan data meja yang diperbarui
 */
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID meja dari URL
    const { number, isEmpty } = req.body; // Mengambil data nomor dan status meja dari body request
    const image = req.file ? req.file.path : null; // Mengambil gambar baru jika ada

    // Ambil data meja yang ada di database
    const existingTable = await prisma.table.findUnique({ where: { id: parseInt(id) } });

    // Memperbarui meja dengan data yang baru
    const updatedTable = await prisma.table.update({
      where: { id: parseInt(id) },
      data: {
        number: number !== undefined ? parseInt(number) : existingTable.number, // Memperbarui nomor meja jika ada
        isEmpty: isEmpty !== undefined ? isEmpty === 'true' : existingTable.isEmpty, // Memperbarui status meja jika ada
        image: image !== null ? image : existingTable.image, // Memperbarui gambar meja jika ada
        addBy: req.user.id, // ID pengguna yang memperbarui meja
      },
    });

    // Mengirimkan response sukses dengan data meja yang diperbarui
    res.json({ isSuccess: true, data: updatedTable });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal memperbarui meja', error: error.message });
  }
});

/**
 * Endpoint untuk menghapus meja berdasarkan ID.
 * Menghapus meja dan menghapus file gambar terkait jika ada.
 *
 * @param {number} id - ID meja yang ingin dihapus
 * 
 * @returns {Object} JSON yang berisi status dan pesan hasil penghapusan meja
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Mencari meja yang ingin dihapus berdasarkan ID
    const tableToDelete = await prisma.table.findUnique({ where: { id: parseInt(req.params.id) } });

    // Jika meja memiliki gambar, hapus file gambar tersebut
    if (tableToDelete.image) {
      const fs = require('fs'); // Mengimpor modul file system untuk menghapus file
      fs.unlinkSync(tableToDelete.image); // Menghapus file gambar dari server
    }

    // Menghapus meja dari database
    await prisma.table.delete({ where: { id: parseInt(req.params.id) } });

    // Mengirimkan response sukses setelah penghapusan
    res.status(200).json({ isSuccess: true, message: 'Meja berhasil dihapus' });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    res.status(500).json({ isSuccess: false, message: 'Gagal menghapus meja', error: error.message });
  }
});

module.exports = router; // Mengekspor router untuk digunakan di file lain
