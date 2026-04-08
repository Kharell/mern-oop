const CatatanHarian = require("../models/catatanHarian");

// @desc    Ambil semua catatan (Pin paling atas, lalu terbaru)
exports.getCatatan = async (req, res) => {
  try {
    const catatan = await CatatanHarian.find().sort({ pin: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: catatan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal memuat catatan" });
  }
};

// @desc    Tambah catatan baru
exports.addCatatan = async (req, res) => {
  try {
    const baru = await CatatanHarian.create(req.body);
    res.status(201).json({ success: true, data: baru });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update catatan atau toggle status Pin
exports.updateCatatan = async (req, res) => {
  try {
    const update = await CatatanHarian.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({ success: true, data: update });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Gagal memperbarui catatan" });
  }
};

// @desc    Hapus catatan
exports.deleteCatatan = async (req, res) => {
  try {
    await CatatanHarian.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Catatan berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Data tidak ditemukan" });
  }
};
