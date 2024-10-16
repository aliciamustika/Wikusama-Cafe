const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Mengonfigurasi penyimpanan untuk unggahan file menggunakan multer.
 * File akan disimpan di direktori 'uploads/' dengan nama file unik.
 */
const storage = multer.diskStorage({
  /**
   * Mengatur folder tujuan untuk file yang diunggah.
   * Jika folder 'uploads/' tidak ditemukan, folder tersebut akan dibuat.
   *
   * @param {Object} req - Objek permintaan.
   * @param {Object} file - Objek file yang diunggah.
   * @param {Function} cb - Fungsi callback.
   */
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';

    // Memeriksa apakah folder 'uploads' ada
    if (!fs.existsSync(uploadDir)) {
      // Membuat folder 'uploads' jika belum ada
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Mengatur folder tujuan untuk file yang diunggah
    cb(null, uploadDir);
  },

  /**
   * Membuat nama file yang unik dengan menambahkan timestamp ke nama file asli.
   *
   * @param {Object} req - Objek permintaan.
   * @param {Object} file - Objek file yang diunggah.
   * @param {Function} cb - Fungsi callback.
   */
  filename: (req, file, cb) => {
    // Membuat nama file unik menggunakan timestamp saat ini dan ekstensi file asli
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

/**
 * Mengatur middleware multer dengan batasan ukuran file dan validasi tipe file.
 * Membatasi ukuran file maksimal 5MB dan hanya mengizinkan format file gambar.
 */
const upload = multer({
  storage: storage, // Menggunakan konfigurasi penyimpanan yang sudah didefinisikan
  limits: { fileSize: 5 * 1024 * 1024 }, // Mengatur ukuran file maksimal 5MB

  /**
   * Menyaring file yang diunggah hanya untuk tipe gambar (jpeg, jpg, png, gif).
   *
   * @param {Object} req - Objek permintaan.
   * @param {Object} file - Objek file yang diunggah.
   * @param {Function} cb - Fungsi callback untuk menerima atau menolak file.
   */
  fileFilter: (req, file, cb) => {
    // Menentukan ekstensi file yang diizinkan
    const filetypes = /jpeg|jpg|png|gif/;
    
    // Memeriksa apakah mimetype dan ekstensi file valid
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Jika file valid, lanjutkan, jika tidak, kirim error
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File yang diunggah harus berupa gambar!'));
  }
});

module.exports = upload;
