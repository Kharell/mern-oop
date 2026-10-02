const BaseController = require("./BaseController");
const Keuangan = require("../models/KeuanganModel");

// OOP concept: inheritance (KeuanganController mewarisi BaseController)
class KeuanganController extends BaseController {
  getValidationMessage(error) {
    return Object.values(error.errors)[0].message;
  }

  // @desc    Ambil semua data keuangan (urut berdasarkan tanggal terbaru)
  async getKeuangan(req, res) {
    try {
      const data = await Keuangan.find({ user: req.user.id }).sort({
        tanggal: -1,
      });

      this.sendSuccess(res, data, "Berhasil memuat data keuangan");
    } catch (error) {
      console.error("[KEUANGAN GET]", error.message);
      this.sendError(res, "Gagal memuat data keuangan", 500);
    }
  }

  // @desc    Tambah transaksi baru
  async addTransaksi(req, res) {
    try {
      const transaksi = await Keuangan.create({
        ...req.body,
        user: req.user.id,
      });

      this.sendSuccess(res, transaksi, "Transaksi berhasil ditambahkan", 201);
    } catch (error) {
      if (error.name === "ValidationError") {
        return this.sendError(res, this.getValidationMessage(error), 400);
      }
      console.error("[KEUANGAN ADD]", error.message);
      this.sendError(res, "Gagal menambahkan transaksi", 400);
    }
  }

  // @desc    Ambil ringkasan (total pemasukan, pengeluaran, & saldo)
  async getRingkasanKeuangan(req, res) {
    try {
      const allData = await Keuangan.find({ user: req.user.id });

      const summary = allData.reduce(
        (acc, curr) => {
          if (curr.tipe === "pemasukan") acc.totalMasuk += curr.nominal;
          if (curr.tipe === "pengeluaran") acc.totalKeluar += curr.nominal;
          return acc;
        },
        { totalMasuk: 0, totalKeluar: 0 },
      );

      this.sendSuccess(
        res,
        {
          ...summary,
          saldo: summary.totalMasuk - summary.totalKeluar,
        },
        "Berhasil menghitung ringkasan keuangan",
      );
    } catch (error) {
      console.error("[KEUANGAN SUMMARY]", error.message);
      this.sendError(res, "Gagal menghitung saldo", 500);
    }
  }

  // @desc    Hapus transaksi
  async deleteTransaksi(req, res) {
    try {
      const deleted = await Keuangan.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!deleted) {
        return this.sendError(res, "Data tidak ditemukan", 404);
      }

      this.sendSuccess(res, null, "Transaksi berhasil dihapus");
    } catch (error) {
      if (error.name === "CastError") {
        return this.sendError(res, "ID transaksi tidak valid", 400);
      }
      console.error("[KEUANGAN DELETE]", error.message);
      this.sendError(res, "Gagal menghapus transaksi", 500);
    }
  }
}

module.exports = new KeuanganController();