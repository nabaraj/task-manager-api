const mongoose = require('mongoose');
const STATUS_TYPES = ['pending', 'progress', 'done'];

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: { values: STATUS_TYPES, message: "Status must be pending, progress, or done" },
        default: "pending"
    }
},
    { timestamps: true })
module.exports = mongoose.model("Task", taskSchema)