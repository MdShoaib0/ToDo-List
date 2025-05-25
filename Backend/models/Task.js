const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
