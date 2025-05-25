const express = require('express');
const router = express.Router();
const Prayer = require("../models/Prayer.js");

// Get all prayers
router.get("/", async (req, res) => {
    try {
        const prayers = await Prayer.find();
        res.json(prayers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch prayers' });
    }
});

// Add a new prayer
router.post("/", async (req, res) => {
    try {
        const { name, days } = req.body;
        const newPrayer = new Prayer({ name, days });
        await newPrayer.save();
        res.status(201).json(newPrayer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update prayer days
router.put("/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const { days } = req.body;
        const prayer = await Prayer.findOneAndUpdate(
            { name }, 
            { days }, 
            { new: true, upsert: true }
        );
        res.json(prayer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a prayer
router.delete("/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const result = await Prayer.deleteOne({ name });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Prayer not found' });
        }
        res.json({ message: "Prayer deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;