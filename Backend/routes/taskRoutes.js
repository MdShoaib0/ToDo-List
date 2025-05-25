const express = require('express');
const router = express.Router();
const Task = require("../models/Task.js");

// GET /tasks - Fetch all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
    try {
        const latestTask = await Task.findOne().sort({ id: -1 });
        const nextId = latestTask ? latestTask.id + 1 : 1;

        const taskData = {
            ...req.body,
            id: nextId
        };

        const task = new Task(taskData);
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Task creation failed:", error);
        res.status(500).json({ error: error.message || 'Failed to create task' });
    }
});


// PUT /tasks/:id - Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            ...updatedTask.toObject(),
            id: updatedTask._id.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            deletedId: id
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;