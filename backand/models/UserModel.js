const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Format email tidak valid"],
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
      // Catatan: panjang password divalidasi di AuthController,
      // karena yang tersimpan di database adalah hash bcrypt (60 karakter),
      // sehingga minlength di schema tidak akan pernah memicu error.
      // select: false -> password tidak ikut terkirim di response,
      // kecuali diminta eksplisit dengan .select("+password")
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
