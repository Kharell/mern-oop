// Todo List Routes
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Hubungkan jalur URL dengan method di taskController
router.post("/", (req, res) => taskController.createTask(req, res));
router.get("/", (req, res) => taskController.getAllTasks(req, res));
router.put("/:id", (req, res) => taskController.updateTask(req, res));
router.delete("/:id", (req, res) => taskController.deleteTask(req, res));

module.exports = router;
