const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
    res.json({
        tasks
    });
});

router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const task = {
        id: Date.now(),
        title
    };

    tasks.push(task);
    res.status(201).json(task);
});

module.exports = router;
