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
      default: "Umum", 
      trim: true,
    },
    warna: {
      type: String,
      default: "#ffffff", 
    },
    pin: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true, 
  },
);

module.exports = mongoose.model("CatatanHarian", CatatanHarianSchema);
