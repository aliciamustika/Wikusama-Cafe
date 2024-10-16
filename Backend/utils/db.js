// Import PrismaClient from Prisma
const { PrismaClient } = require('@prisma/client');

// Create a PrismaClient instance and export it
const prisma = new PrismaClient();

// Ensure Prisma Client disconnects when the application shuts down
process.on('exit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;