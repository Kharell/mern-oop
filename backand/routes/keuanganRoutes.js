// Keuangan Routes
const express = require("express");
const router = express.Router();
const keuanganController = require("../controllers/KeuanganController");
const authMiddleware = require("../middleware/AuthMiddleware");

// Semua endpoint keuangan wajib login (verifikasi token JWT)
router.use(authMiddleware.protect);

// Endpoint ringkasan harus didaftarkan sebelum "/:id" (kalau nanti ditambah)
router.get("/ringkasan", (req, res) =>
  keuanganController.getRingkasanKeuangan(req, res),
);

router.post("/", (req, res) => keuanganController.addTransaksi(req, res));
router.get("/", (req, res) => keuanganController.getKeuangan(req, res));
router.delete("/:id", (req, res) => keuanganController.deleteTransaksi(req, res));

module.exports = router;