// Catatan Harian Routes
const express = require("express");
const router = express.Router();
const catatanController = require("../controllers/CatatanController");
const authMiddleware = require("../middleware/AuthMiddleware");

// Semua endpoint catatan wajib login (verifikasi token JWT)
router.use(authMiddleware.protect);

router.post("/", (req, res) => catatanController.addCatatan(req, res));
router.get("/", (req, res) => catatanController.getCatatan(req, res));
router.put("/:id", (req, res) => catatanController.updateCatatan(req, res));
router.delete("/:id", (req, res) => catatanController.deleteCatatan(req, res));

module.exports = router;