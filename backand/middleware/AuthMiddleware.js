const jwt = require("jsonwebtoken");
const BaseController = require("../controllers/BaseController");

// OOP concept: middleware dibuat sebagai class yang mewarisi BaseController,
// supaya format error-nya konsisten dengan seluruh API.
class AuthMiddleware extends BaseController {
  constructor() {
    super();
    // bind agar `this` tetap mengarah ke instance walau dipakai sebagai
    // middleware (Express memanggilnya tanpa context class)
    this.protect = this.protect.bind(this);
  }

  // Verifikasi token pada header: Authorization: Bearer <token>
  protect(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return this.sendError(res, "Akses ditolak, token tidak ditemukan", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      return next();
    } catch {
      return this.sendError(
        res,
        "Token tidak valid atau sudah kedaluwarsa",
        401,
      );
    }
  }
}

module.exports = new AuthMiddleware();
