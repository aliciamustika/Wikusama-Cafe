const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// Middleware untuk parsing body
app.use(express.json()); // Pastikan ini ada sebelum middleware auth

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).send('Token verification failed');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = auth;
