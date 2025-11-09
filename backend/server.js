const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Initialiser express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({  extended: true }));

// connection à mongoDB
connectDB();

// Routes
app.use('/api/etudiant', require('./routes/studentRouter'))

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server demarer sur http://localhost:${PORT}`);
});