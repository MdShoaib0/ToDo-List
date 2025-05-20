// server.js

// ====================
// Imports & Setup
// ====================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ====================
// MongoDB Connection
// ====================

const mongoURI = 'mongodb+srv://mdshoaib0:Kabooter123%40@mdshoaib.991gs6w.mongodb.net/ToDo_List';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ====================
// Task Model
// ====================

const TaskSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    category: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

// ====================
// Routes
// ====================

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Server is up and running!');
});

// ------- Task Routes --------

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deleted = await Task.deleteOne({ id: req.params.id });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: '✅ Task deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const prayerSchema = new mongoose.Schema({
    name: String,
    days: Number,
});

const Prayer = mongoose.model("Prayer", prayerSchema);

// ----------- Routes -----------

// Get all prayers
app.get("/prayers", async (req, res) => {
    const prayers = await Prayer.find();
    res.json(prayers);
});

// Add a new prayer
app.post("/prayers", async (req, res) => {
    const { name, days } = req.body;
    const newPrayer = new Prayer({ name, days });
    await newPrayer.save();
    res.json(newPrayer);
});

// Update prayer days
app.put("/prayers/:name", async (req, res) => {
    const { name } = req.params;
    const { days } = req.body;
    const prayer = await Prayer.findOneAndUpdate({ name }, { days }, { new: true, upsert: true });
    res.json(prayer);
});

// Delete a prayer
app.delete("/prayers/:name", async (req, res) => {
    const { name } = req.params;
    await Prayer.deleteOne({ name });
    res.json({ message: "Prayer deleted" });
});

// ====================
// Start Server
// ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});