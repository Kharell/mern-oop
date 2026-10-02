const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseController = require("./BaseController");

// OOP concept: inheritance (AuthController mewarisi BaseController)
class AuthController extends BaseController {
  constructor() {
    super();
    // bind agar `this` tetap mengarah ke instance, walau method-nya
    // dipakai langsung sebagai handler di route Express
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  // Fitur Register (Daftar Akun)
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // 1. Validasi input dasar
      if (!name || !email || !password) {
        return this.sendError(res, "Nama, email, dan password wajib diisi", 400);
      }

      // 2. Validasi panjang password (hash bcrypt tidak bisa divalidasi di model)
      if (password.length < 6) {
        return this.sendError(res, "Password minimal 6 karakter", 400);
      }

      // 3. Cek apakah email sudah terdaftar
      const userExist = await User.findOne({ email });
      if (userExist) {
        return this.sendError(res, "Email sudah digunakan", 400);
      }

      // 4. Hash Password (mengacak password agar aman)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 5. Simpan ke Database
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      this.sendSuccess(
        res,
        { id: newUser._id, name: newUser.name, email: newUser.email },
        "User berhasil didaftarkan",
        201,
      );
    } catch (error) {
      // 11000 = duplikat email (misal 2 request daftar bersamaan)
      if (error.code === 11000) {
        return this.sendError(res, "Email sudah digunakan", 400);
      }

      // error validasi dari Mongoose (misal format email / password pendek)
      if (error.name === "ValidationError") {
        const message = Object.values(error.errors)[0].message;
        return this.sendError(res, message, 400);
      }

      console.error("[AUTH REGISTER]", error.message);
      this.sendError(res, "Terjadi kesalahan pada server", 500);
    }
  }

  // Fitur Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return this.sendError(res, "Email dan password wajib diisi", 400);
      }

      // 1. Cari user berdasarkan email
      //    (password harus di-select eksplisit karena select: false di model)
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return this.sendError(res, "Email salah atau tidak ditemukan", 400);
      }

      // 2. Cek password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return this.sendError(res, "Password salah", 400);
      }

      // 3. Buat Token JWT (tiket masuk)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      this.sendSuccess(
        res,
        {
          token,
          user: { id: user._id, name: user.name, email: user.email },
        },
        "Login berhasil",
      );
    } catch (error) {
      console.error("[AUTH LOGIN]", error.message);
      this.sendError(res, "Terjadi kesalahan pada server", 500);
    }
  }
}

module.exports = new AuthController();