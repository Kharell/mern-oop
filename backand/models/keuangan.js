const mongoose = require("mongoose");

const KeuanganSchema = new mongoose.Schema(
  {
    keterangan: {
      type: String,
      required: [true, "Keterangan transaksi wajib diisi"],
      trim: true,
    },
    nominal: {
      type: Number,
      required: [true, "Nominal uang wajib diisi"],
      min: [0, "Nominal tidak boleh negatif"],
    },
    tipe: {
      type: String,
      enum: ["pemasukan", "pengeluaran"], 
      required: [true, "Tipe transaksi (pemasukan/pengeluaran) wajib diisi"],
    },
    kategori: {
      type: String,
      default: "Lainnya", 
      trim: true,
    },
    tanggal: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Keuangan", KeuanganSchema);
