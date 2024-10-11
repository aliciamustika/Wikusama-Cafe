const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
const router = express.Router();
const prisma = new PrismaClient();

// Create table
router.post('/', auth, async (req, res) => {
  const { number, isEmpty, image } = req.body;
  const newTable = await prisma.table.create({
    data: {
      number,
      isEmpty,
      image,
      addBy: req.user.id,
    },
  });
  res.json(newTable);
});

// Get all tables
router.get('/', async (req, res) => {
  const tables = await prisma.table.findMany();
  res.json(tables);
});

// Update table
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { number, isEmpty, image } = req.body;

  const updatedTable = await prisma.table.update({
    where: { id: parseInt(id) },
    data: {
      number,
      isEmpty,
      image,
      addBy: req.user.id,
    },
  });
  res.json(updatedTable);
});

// Delete table
router.delete('/:id', auth, async (req, res) => {
  await prisma.table.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;
