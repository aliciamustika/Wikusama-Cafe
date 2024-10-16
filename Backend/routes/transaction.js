// Mengimpor dependensi yang dibutuhkan
const express = require('express'); // Express untuk routing dan server
const auth = require('../middlewares/auth'); // Middleware untuk otentikasi
const router = express.Router(); // Router untuk menangani route Express
const prisma = require('../utils/db'); // Prisma Client instance untuk query database

/**
 * Endpoint untuk membuat pesanan baru.
 * Mengambil data dari request body dan menyimpannya ke dalam database.
 * Validasi input dan menghitung total berdasarkan item yang dipilih.
 *
 * @param {string} customerName - Nama pelanggan
 * @param {string} status - Status transaksi (misalnya "paid" atau "unpaid")
 * @param {number} tableId - ID meja yang dipilih
 * @param {Array} food - Array objek makanan dengan properti {id, qty}
 * @param {Array} drink - Array objek minuman dengan properti {id, qty}
 * 
 * @returns {Object} JSON yang berisi status dan data transaksi yang baru dibuat
 */
router.post('/new', auth, async (req, res) => {
  try {
    const { customerName, status, tableId } = req.body;
    let { food, drink } = req.body; // Mengambil data food dan drink dari body request

    // Validasi apakah food dan drink adalah array dengan format yang benar
    if (!Array.isArray(food) || !Array.isArray(drink)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Food dan drink harus berupa array ID dan quantity'
      });
    }

    // Validasi bahwa setiap item dalam food dan drink memiliki id dan qty yang valid
    if (food.some(item => typeof item.id !== 'number' || item.id <= 0 || typeof item.qty !== 'number' || item.qty <= 0)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Food harus berisi array ID makanan dan quantity yang valid'
      });
    }

    if (drink.some(item => typeof item.id !== 'number' || item.id <= 0 || typeof item.qty !== 'number' || item.qty <= 0)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Drink harus berisi array ID minuman dan quantity yang valid'
      });
    }

    // Ambil data makanan dari database berdasarkan ID yang diberikan
    const foods = await prisma.food.findMany({
      where: { id: { in: food.map(item => item.id) } }
    });

    // Ambil data minuman dari database berdasarkan ID yang diberikan
    const drinks = await prisma.drink.findMany({
      where: { id: { in: drink.map(item => item.id) } }
    });

    // Validasi apakah tableId ada di dalam database
    const tableExists = await prisma.table.findUnique({ where: { id: parseInt(tableId) } });
    if (!tableExists) {
      return res.status(404).json({ isSuccess: false, message: 'Tabel tidak ditemukan' });
    }

    // Gabungkan items (food dan drink) menjadi satu array dengan quantity
    const items = [
      ...foods.map(item => ({
        foodId: item.id,
        drinkId: null,
        quantity: food.find(f => f.id === item.id).qty, // Mengambil quantity dari body request
        price: item.price
      })),
      ...drinks.map(item => ({
        foodId: null,
        drinkId: item.id,
        quantity: drink.find(d => d.id === item.id).qty, // Mengambil quantity dari body request
        price: item.price
      }))
    ];

    // Hitung total harga berdasarkan item yang dipesan
    const calculatedTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Buat transaksi baru dan simpan item yang terkait
    const newTransaction = await prisma.transaction.create({
      data: {
        customerName: customerName, // Nama pelanggan
        total: calculatedTotal, // Total dihitung otomatis
        status, // Status transaksi
        tableId: parseInt(tableId), // ID meja
        addBy: req.user.id, // ID pengguna yang membuat pesanan
        items: {
          create: items // Menyimpan item-item yang terkait dengan transaksi
        }
      },
      include: {
        items: true // Menyertakan items dalam response jika diperlukan
      }
    });

    // Mengirimkan response dengan status sukses dan data transaksi
    res.json({ isSuccess: true, data: newTransaction });
  } catch (error) {
    // Menangani error dan memberikan response error kepada client
    console.error(error); // Mencetak error di server untuk tujuan debugging
    res.status(500).json({ isSuccess: false, message: 'Gagal menambah pesanan', error: error.message });
  }
});

/**
 * Endpoint untuk mengambil semua transaksi dengan paginasi dan filter opsional.
 * Mendukung filter berdasarkan nama pelanggan, status transaksi, dan rentang tanggal.
 *
 * @param {number} page - Halaman yang diminta untuk paginasi (default 1)
 * @param {number} limit - Jumlah transaksi per halaman (default 10)
 * @param {string} customerName - Nama pelanggan untuk filter (opsional)
 * @param {string} status - Status transaksi untuk filter (opsional)
 * @param {string} startDate - Tanggal mulai untuk filter transaksi (opsional)
 * @param {string} endDate - Tanggal akhir untuk filter transaksi (opsional)
 * 
 * @returns {Object} JSON yang berisi status, data transaksi, dan informasi paginasi
 */
router.get('/', async (req, res) => {
  try {
    // Mengambil parameter query untuk paginasi, filter, dan sorting
    const { page = 1, limit = 10, customerName, status, startDate, endDate } = req.query;

    // Menentukan halaman dan limit jika tidak diberikan dalam query
    const pageNumber = parseInt(page); // Halaman yang diminta
    const pageLimit = parseInt(limit); // Jumlah transaksi per halaman

    // Menentukan filter berdasarkan query parameter
    const filters = {};
    if (customerName) {
      filters.customerName = { contains: customerName, mode: 'insensitive' }; // Filter nama pelanggan (case insensitive)
    }
    if (status) {
      filters.status = status; // Filter status transaksi
    }
    if (startDate && endDate) {
      filters.date = {
        gte: new Date(startDate), // Transaksi setelah tanggal startDate
        lte: new Date(endDate)    // Transaksi sebelum tanggal endDate
      };
    } else if (startDate) {
      filters.date = { gte: new Date(startDate) }; // Transaksi setelah tanggal startDate
    } else if (endDate) {
      filters.date = { lte: new Date(endDate) }; // Transaksi sebelum tanggal endDate
    }

    // Mengambil transaksi dengan paginasi, filter, dan sorting berdasarkan tanggal (desc)
    const transactions = await prisma.transaction.findMany({
      where: filters,
      skip: (pageNumber - 1) * pageLimit,  // Pagination: melewatkan halaman sebelumnya
      take: pageLimit,                      // Mengambil jumlah data sesuai limit
      include: {
        items: true,  // Termasuk items (TransactionItem) jika diperlukan
      },
      orderBy: {
        date: 'desc'  // Mengurutkan berdasarkan tanggal secara menurun
      }
    });

    // Mendapatkan total jumlah transaksi untuk paginasi
    const totalTransactions = await prisma.transaction.count({ where: filters });

    // Menghitung total halaman
    const totalPages = Math.ceil(totalTransactions / pageLimit);

    // Mengirimkan respons dengan data transaksi dan informasi paginasi
    res.json({
      isSuccess: true,
      data: transactions,
      pagination: {
        totalItems: totalTransactions,  // Total transaksi yang ditemukan
        totalPages: totalPages,         // Total halaman
        currentPage: pageNumber,        // Halaman saat ini
        pageSize: pageLimit             // Jumlah transaksi per halaman
      }
    });

  } catch (error) {
    console.error(error); // Mencetak error di server untuk debug
    res.status(500).json({ isSuccess: false, message: 'Failed to fetch transactions', error: error.message });
  }
});

/**
 * Endpoint untuk menghapus transaksi berdasarkan ID.
 * Sebelum menghapus transaksi, memeriksa apakah transaksi ada dan apakah pengguna yang sedang login berhak menghapusnya.
 *
 * @param {number} id - ID transaksi yang ingin dihapus
 * 
 * @returns {Object} JSON yang berisi status dan pesan hasil penghapusan
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Mencari transaksi berdasarkan ID
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    // Jika transaksi tidak ditemukan, mengembalikan 404 error
    if (!transaction) {
      return res.status(404).json({ isSuccess: false, message: 'Transaction not found' });
    }

    // Memeriksa apakah pengguna yang sedang login memiliki hak untuk menghapus transaksi
    if (transaction.addBy !== req.user.id) {
      return res.status(403).json({ isSuccess: false, message: 'Unauthorized' });
    }

    // Menghapus item transaksi terkait terlebih dahulu
    await prisma.transactionItem.deleteMany({
      where: { transactionId: transaction.id }
    });

    // Menghapus transaksi itu sendiri
    await prisma.transaction.delete({
      where: { id: parseInt(req.params.id) }
    });

    // Mengirimkan respons sukses
    res.json({ isSuccess: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error); // Mencetak error di server untuk debug
    res.status(500).json({ isSuccess: false, message: 'Failed to delete transaction', error: error.message });
  }
});

// Mengekspor router agar bisa digunakan di file lainnya
module.exports = router;
