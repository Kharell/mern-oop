const BaseController = require("./BaseController");
const CatatanHarian = require("../models/CatatanHarianModel");

// OOP concept: inheritance (CatatanController mewarisi BaseController)
class CatatanController extends BaseController {
  getValidationMessage(error) {
    return Object.values(error.errors)[0].message;
  }

  // @desc    Ambil semua catatan (Pin paling atas, lalu terbaru)
  async getCatatan(req, res) {
    try {
      const catatan = await CatatanHarian.find({ user: req.user.id }).sort({
        pin: -1,
        createdAt: -1,
      });

      this.sendSuccess(res, catatan, "Berhasil memuat catatan");
    } catch (error) {
      console.error("[CATATAN GET]", error.message);
      this.sendError(res, "Gagal memuat catatan", 500);
    }
  }

  // @desc    Tambah catatan baru
  async addCatatan(req, res) {
    try {
      const baru = await CatatanHarian.create({
        ...req.body,
        user: req.user.id,
      });

      this.sendSuccess(res, baru, "Catatan berhasil ditambahkan", 201);
    } catch (error) {
      if (error.name === "ValidationError") {
        return this.sendError(res, this.getValidationMessage(error), 400);
      }
      console.error("[CATATAN ADD]", error.message);
      this.sendError(res, "Gagal menambahkan catatan", 400);
    }
  }

  // @desc    Update catatan atau toggle status Pin
  async updateCatatan(req, res) {
    try {
      const update = await CatatanHarian.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true },
      );

      if (!update) {
        return this.sendError(res, "Catatan tidak ditemukan", 404);
      }

      this.sendSuccess(res, update, "Catatan berhasil diperbarui");
    } catch (error) {
      if (error.name === "CastError") {
        return this.sendError(res, "ID catatan tidak valid", 400);
      }
      if (error.name === "ValidationError") {
        return this.sendError(res, this.getValidationMessage(error), 400);
      }
      console.error("[CATATAN UPDATE]", error.message);
      this.sendError(res, "Gagal memperbarui catatan", 400);
    }
  }

  // @desc    Hapus catatan
  async deleteCatatan(req, res) {
    try {
      const deleted = await CatatanHarian.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!deleted) {
        return this.sendError(res, "Catatan tidak ditemukan", 404);
      }

      this.sendSuccess(res, null, "Catatan berhasil dihapus");
    } catch (error) {
      if (error.name === "CastError") {
        return this.sendError(res, "ID catatan tidak valid", 400);
      }
      console.error("[CATATAN DELETE]", error.message);
      this.sendError(res, "Gagal menghapus catatan", 500);
    }
  }
}

module.exports = new CatatanController();