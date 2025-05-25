const express = require('express');
const router = express.Router();
const Task = require("../models/Task.js");

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const ID = req.params.id;
        const newTask = req.body;

        const result = await Task.updateOne({ _id: ID }, { $set: newTask });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or no changes made." });
        }

        res.status(200).json({ message: "✅ Task updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const ID = req.params.id;
        const deleted = await Task.deleteOne({ _id: ID });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: '✅ Task deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;