const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
const router = express.Router();
const prisma = new PrismaClient();

// Create food
router.post('/', auth, async (req, res) => {
  const { name, details, price, image, isDessert, isSnack, isMainCourse } = req.body;

  const newFood = await prisma.food.create({
    data: {
      name,
      details,
      price,
      image,
      isDessert,
      isSnack,
      isMainCourse,
      addBy: req.user.id, // Set the user who added it
    },
  });

  res.json(newFood);
});

// Get all food
router.get('/', async (req, res) => {
  const foods = await prisma.food.findMany();
  res.json(foods);
});

// Get food by ID
router.get('/:id', async (req, res) => {
  const food = await prisma.food.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(food);
});

// Update food
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, details, price, image, isDessert, isSnack, isMainCourse } = req.body;

  const updatedFood = await prisma.food.update({
    where: { id: parseInt(id) },
    data: {
      name,
      details,
      price,
      image,
      isDessert,
      isSnack,
      isMainCourse,
      addBy: req.user.id,
    },
  });

  res.json(updatedFood);
});

// Delete food
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  await prisma.food.delete({
    where: { id: parseInt(id) },
  });

  res.sendStatus(204);
});

module.exports = router;
