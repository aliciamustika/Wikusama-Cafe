const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
const router = express.Router();
const prisma = new PrismaClient();

// Create transaction
router.post('/', auth, async (req, res) => {
  const { customerName, menu, total, status, tableId } = req.body;
  const newTransaction = await prisma.transaction.create({
    data: {
      customerName,
      menu, // Expecting a JSON structure for the menu
      total,
      status,
      tableId,
      addBy: req.user.id,
    },
  });
  res.json(newTransaction);
});

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

// Update transaction
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { customerName, menu, total, status, tableId } = req.body;

  const updatedTransaction = await prisma.transaction.update({
    where: { id: parseInt(id) },
    data: {
      customerName,
      menu,
      total,
      status,
      tableId,
      addBy: req.user.id,
    },
  });
  res.json(updatedTransaction);
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  await prisma.transaction.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;
