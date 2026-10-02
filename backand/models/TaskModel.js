const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul wajib diisi"],
      trim: true,
      maxlength: [200, "Judul maksimal 200 karakter"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // relasi ke pemilik task, agar setiap user punya daftar todo sendiri
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
