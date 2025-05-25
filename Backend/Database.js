require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");

const app = express();

const URL = process.env.COMPASS_URI;
const PORT = process.env.PORT || 7000;

function DatabaseConnect() {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB connected');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

module.exports = DatabaseConnect;