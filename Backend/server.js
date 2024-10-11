const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Menggunakan express.json() langsung
app.use(express.urlencoded({ extended: true })); // Menggunakan express.urlencoded() langsung

// Routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const drinkRoutes = require('./routes/drink');
const tableRoutes = require('./routes/table');
const transactionRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');  // Add user routes

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/drink', drinkRoutes);
app.use('/api/table', tableRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
