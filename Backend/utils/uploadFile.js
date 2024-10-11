const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batasi ukuran file maksimum 5MB
  fileFilter: (req, file, cb) => { // Filter untuk hanya mengizinkan tipe file tertentu
    const filetypes = /jpeg|jpg|png|gif/; // Tipe file yang diizinkan
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload hanya dapat berupa gambar!'));
  }
});

module.exports = upload;