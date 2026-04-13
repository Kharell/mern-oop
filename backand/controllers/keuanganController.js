const Keuangan = require("../models/keuangan");

// @desc    Ambil semua data keuangan (Urut berdasarkan tanggal terbaru)
exports.getKeuangan = async (req, res) => {
  try {
    const data = await Keuangan.find().sort({ tanggal: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal memuat data keuangan" });
  }
};

// @desc    Tambah transaksi baru
exports.addTransaksi = async (req, res) => {
  try {
    const transaksi = await Keuangan.create(req.body);
    res.status(201).json({ success: true, data: transaksi });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Ambil Ringkasan (Total Pemasukan, Pengeluaran, & Saldo)
exports.getRingkasanKeuangan = async (req, res) => {
  try {
    const allData = await Keuangan.find();

    const summary = allData.reduce(
      (acc, curr) => {
        if (curr.tipe === "pemasukan") acc.totalMasuk += curr.nominal;
        if (curr.tipe === "pengeluaran") acc.totalKeluar += curr.nominal;
        return acc;
      },
      { totalMasuk: 0, totalKeluar: 0 },
    );

    res.status(200).json({
      success: true,
      summary: {
        ...summary,
        saldo: summary.totalMasuk - summary.totalKeluar,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghitung saldo" });
  }
};

// @desc    Hapus transaksi
exports.deleteTransaksi = async (req, res) => {
  try {
    await Keuangan.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Transaksi berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Data tidak ditemukan" });
  }
};
