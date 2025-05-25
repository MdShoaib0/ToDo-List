require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.COMPASS_URI;

function DatabaseConnect() {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB connected');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        throw err; // Re-throw to handle in server.js
    });
}

module.exports = DatabaseConnect;