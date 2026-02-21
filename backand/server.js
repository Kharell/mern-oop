const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// koneksi ke database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("koneksi mongodb Berhasil di jalankan ...."))
  .catch((err) => console.log("koneksi mongodb Gagal di jalankan ....", err));

// Test Route
app.get("/", (req, res) => {
  res.send("API is running ...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
