const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Hubungkan jalur URL dengan method di AuthController
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
