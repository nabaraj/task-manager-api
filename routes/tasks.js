const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
    res.json({
        tasks
    });
});

router.post("/", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title
    }
    tasks.push(task);
    res.status(201).json(tasks)
})

module.exports = router;
