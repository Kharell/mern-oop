// Todo List Routes
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");
const authMiddleware = require("../middleware/AuthMiddleware");

// Semua endpoint task wajib login (verifikasi token JWT)
router.use(authMiddleware.protect);

// Hubungkan jalur URL dengan method di TaskController
router.post("/", (req, res) => taskController.createTask(req, res));
router.get("/", (req, res) => taskController.getAllTasks(req, res));
router.put("/:id", (req, res) => taskController.updateTask(req, res));
router.delete("/:id", (req, res) => taskController.deleteTask(req, res));

module.exports = router;