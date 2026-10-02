const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const catatanRoutes = require("./routes/catatanRoutes");
const keuanganRoutes = require("./routes/keuanganRoutes");

const app = express();

// Middleware
// origin dibatasi hanya ke alamat frontend (bisa diatur lewat .env)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/catatan", catatanRoutes);
app.use("/api/keuangan", keuanganRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running ...");
});

// Handler untuk endpoint yang tidak dikenal
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Global error handler: menangkap error yang tidak tertangani di controller
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err.message);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

const PORT = process.env.PORT || 5000;

// koneksi ke database dulu, baru jalankan server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("koneksi mongodb Berhasil di jalankan ....");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("koneksi mongodb Gagal di jalankan ....", err.message);
    process.exit(1);
  });