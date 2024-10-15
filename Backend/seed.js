// Mengimpor dependensi yang dibutuhkan
const { PrismaClient } = require('@prisma/client'); // PrismaClient untuk berinteraksi dengan database
const bcrypt = require('bcrypt'); // Bcrypt untuk enkripsi password

const prisma = new PrismaClient(); // Inisialisasi Prisma Client untuk query database

/**
 * Fungsi utama untuk membuat pengguna admin dengan password yang di-hash.
 * 
 * 1. Hash password untuk pengguna admin.
 * 2. Membuat pengguna baru dengan role admin.
 */
const main = async () => {
  // Hash password untuk pengguna admin
  const hashedPassword = await bcrypt.hash('admin', 10); // Menggunakan bcrypt untuk hash password dengan salt rounds 10

  // Membuat pengguna admin di database
  await prisma.user.create({
    data: {
      username: 'admin', // Username untuk pengguna admin
      password: hashedPassword, // Password yang telah di-hash
      role: 'admin', // Role pengguna sebagai admin
      image: 'admin.jpg',  // Gambar opsional untuk pengguna (optional)
    },
  });

  console.log('Admin user created'); // Mencetak pesan bahwa pengguna admin telah berhasil dibuat
};

// Menjalankan fungsi utama
main()
  .catch(e => console.error(e)) // Menangani error yang terjadi selama proses pembuatan pengguna
  .finally(async () => {
    await prisma.$disconnect(); // Memastikan Prisma Client terputus setelah operasi selesai
  });
