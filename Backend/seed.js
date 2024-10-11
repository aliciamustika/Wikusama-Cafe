const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const main = async () => {
  // Hash the password for the admin user
  const hashedPassword = await bcrypt.hash('admin', 10);

  // Create an admin user
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      image: 'admin.jpg',  // Optional
    },
  });

  console.log('Admin user created');
};

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
