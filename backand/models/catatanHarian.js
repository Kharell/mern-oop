const mongoose = require("mongoose");

const CatatanHarianSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: [true, "Judul catatan wajib diisi"],
      trim: true,
      maxlength: [100, "Judul maksimal 100 karakter"],
    },
    isi: {
      type: String,
      required: [true, "Isi catatan tidak boleh kosong"],
    },
    tag: {
      type: String,
      default: "Umum", // Contoh: Ide, Pekerjaan, Pribadi
      trim: true,
    },
    warna: {
      type: String,
      default: "#ffffff", // Bisa digunakan untuk sticky notes berwarna di UI
    },
    pin: {
      type: Boolean,
      default: false, // Untuk menyematkan catatan penting di paling atas
    },
  },
  {
    timestamps: true, // Otomatis membuat createdAt dan updatedAt
  },
);

module.exports = mongoose.model("CatatanHarian", CatatanHarianSchema);
