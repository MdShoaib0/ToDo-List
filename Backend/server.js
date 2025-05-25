const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DatabaseConnect = require("./Database.js");
const taskRoutes = require("./routes/taskRoutes.js");
const prayerRoutes = require("./routes/prayerRoutes.js");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('🚀 Server is up and running!');
});

// API Routes
app.use('/tasks', taskRoutes);
app.use('/prayers', prayerRoutes);

// Database Connection and Server Start
DatabaseConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });

module.exports = app; // Export for testing if needed