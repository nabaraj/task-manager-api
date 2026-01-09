const express = require("express");
const app = express();

app.use(express.json());

const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});