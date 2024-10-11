const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Register a user
// router.post('/register', async (req, res) => {
//   const { username, password, role, image } = req.body;

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       username,
//       password: hashedPassword,
//       role,
//       image,
//     },
//   });

//   res.json(newUser);
// });

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Tambahkan pengecekan untuk memastikan username tidak undefined
  if (!username || !password) return res.status(400).json({ isSuccess: false, error: 'Username & Password is required' });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ isSuccess: false, error: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ isSuccess: false, error: 'Invalid password' });

  // Create and assign a token with expiration of 24 hours
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  // Mengubah respons untuk mengirimkan data dalam format JSON
  res.json({isSuccess: true, token, user });
});

// Menambahkan handler untuk menangani kesalahan
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ isSuccess: false, error: 'Something went wrong!' });
});

module.exports = router;
