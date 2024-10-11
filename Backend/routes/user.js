const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
const router = express.Router();
const prisma = new PrismaClient();
const upload = require('../utils/uploadFile');
const fs = require('fs'); // Added import for fs
const bcrypt = require('bcrypt'); // Tambahkan import bcrypt

// Helper function to check if a user has permission
const checkRole = (req, roles) => roles.includes(req.user.role);

// Create a new user (admin can create managers, and both admin & manager can create cashiers)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ isSuccess: false, error: 'Username, password, and role are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(409).json({ isSuccess: false, error: 'Username already exists.' });
    }

    const image = req.file ? req.file.path : null;

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
        password: hashedPassword, // Gunakan password yang telah dienkripsi
        role,
        image,
        addBy: req.user.id,
      },
    });

    res.json({ isSuccess: true, data: newUser }); // {{ edit_1 }}
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message }); // {{ edit_2 }}
  }
});

// Get all users (restricted to admins)
router.get('/', auth, async (req, res) => {
  try {
    if (!checkRole(req, ['admin'])) {
      return res.status(403).json({ isSuccess: false, error: 'Only admins can view users.' });
    }

    const users = await prisma.user.findMany();
    res.json({ isSuccess: true, data: users }); // {{ edit_3 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message }); // {{ edit_4 }}
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => { // {{ edit_1 }}
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } }); // {{ edit_2 }}

    if (!user) return res.status(404).json({ isSuccess: false, error: 'User not found' }); // {{ edit_3 }}

    res.json({ isSuccess: true, data: user }); // {{ edit_4 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message }); // {{ edit_5 }}
  }
});

// Update user (admin can update anyone, manager can update cashiers)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const userToUpdate = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!userToUpdate) return res.status(404).json({ isSuccess: false, error: 'User not found' });

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
        password: hashedPassword, // Gunakan password yang telah dienkripsi
        role,
        image,
      },
    });

    res.json({ isSuccess: true, data: updatedUser }); // {{ edit_5 }}
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message }); // {{ edit_6 }}
  }
});

// Delete user (admin can delete managers and cashiers, manager can delete cashiers)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!userToDelete) return res.status(404).json({ isSuccess: false, error: 'User not found' });

    if (userToDelete.role === 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ isSuccess: false, error: 'Only admins can delete managers.' });
    }
    if (userToDelete.role === 'cashier' && !checkRole(req, ['admin', 'manager'])) {
      return res.status(403).json({ isSuccess: false, error: 'Only admins and managers can delete cashiers.' });
    }

    // Hapus file foto jika ada
    if (userToDelete.image) {
      fs.unlinkSync(userToDelete.image); // {{ edit_1 }}
    }

    await prisma.user.delete({ where: { id: parseInt(id) } });
    // Mengirimkan respons bahwa data telah berhasil dihapus
    res.status(200).json({ isSuccess: true, message: 'User has been successfully deleted.' }); // {{ edit_2 }}
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: 'Internal server error', details: error.message }); // {{ edit_3 }}
  }
});

module.exports = router;