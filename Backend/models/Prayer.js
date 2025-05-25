const mongoose = require("mongoose");

const prayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    days: {
        type: Number,
        required: true,
        default: 0
    }
});

const Prayer = mongoose.model("Prayer", prayerSchema);
module.exports = Prayer;