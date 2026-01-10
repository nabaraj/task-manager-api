const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

router.post("/", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const task = await Task.create({ title });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to create task" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Invalid task id" });
    }
});
router.patch("/:id", async (req, res) => {
    const { status, title } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (title) updates.title = title;

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "Invalid update or task id" });
    }
});

module.exports = router;
