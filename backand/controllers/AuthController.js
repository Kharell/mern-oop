const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  // Fitur Register (Daftar Akun)
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // 1. Cek apakah email sudah terdaftar
      const userExist = await User.findOne({ email });
      if (userExist)
        return res.status(400).json({ message: "Email sudah digunakan" });

      // 2. Hash Password (Mengacak password agar aman)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 3. Simpan ke Database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User berhasil didaftarkan" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Fitur Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Cari user berdasarkan email
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ message: "Email salah atau tidak ditemukan" });

      // 2. Cek password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Password salah" });

      // 3. Buat Token JWT (Tiket Masuk)
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET, // file .env
        { expiresIn: "1d" },
      );

      res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
