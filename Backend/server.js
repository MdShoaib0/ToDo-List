const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DatabaseConnect = require("./Database.js");
const taskRoutes = require("./routes/taskRoutes.js");
const prayerRoutes = require("./routes/prayerRoutes.js");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
    res.send('🚀 Server is up and running!');
});

// API Routes
app.use('/tasks', taskRoutes);
app.use('/prayers', prayerRoutes);

// Connect to Database and Start Server
DatabaseConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Failed to connect to database:', err);
        process.exit(1);
    });

module.exports = app; // For testing purposes