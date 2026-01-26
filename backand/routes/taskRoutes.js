const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Hubungkan jalur URL dengan method di taskController
router.post("/", (req, res) => taskController.createTask(req, res));
router.get("/", (req, res) => taskController.getAllTasks(req, res));
router.delete("/:id", (req, res) => taskController.deleteTask(req, res));

module.exports = router;
