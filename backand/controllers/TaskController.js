// CRUD Todo List

const BaseController = require("./BaseController");
const Task = require("../models/TaskModel");

// OOP concept: inheritance (TaskController mewarisi BaseController)
class TaskController extends BaseController {
  // Ambil pesan error validasi Mongoose dengan rapi
  getValidationMessage(error) {
    return Object.values(error.errors)[0].message;
  }

  // 1. Method untuk membuat task baru
  async createTask(req, res) {
    try {
      const { title } = req.body;

      if (!title || !title.trim()) {
        return this.sendError(res, "Judul tugas wajib diisi", 400);
      }

      const newTask = await Task.create({ title, user: req.user.id });

      this.sendSuccess(res, newTask, "Berhasil membuat Tugas baru...", 201);
    } catch (error) {
      if (error.name === "ValidationError") {
        return this.sendError(res, this.getValidationMessage(error), 400);
      }
      console.error("[TASK CREATE]", error.message);
      this.sendError(res, "Gagal membuat Tugas baru...", 500);
    }
  }

  // 2. Method untuk mengambil semua task milik user yang sedang login
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({ user: req.user.id }).sort({
        createdAt: -1,
      });

      this.sendSuccess(res, tasks, "Berhasil mengambil semua Tugas...");
    } catch (error) {
      console.error("[TASK GET ALL]", error.message);
      this.sendError(res, "Gagal mengambil semua Tugas...", 500);
    }
  }

  // 3. Method untuk memperbarui task (Edit judul & Toggle status selesai)
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      // hanya field yang dikirim yang di-update
      const payload = {};
      if (title !== undefined) payload.title = title;
      if (completed !== undefined) payload.completed = completed;

      if (Object.keys(payload).length === 0) {
        return this.sendError(res, "Tidak ada data yang diperbarui", 400);
      }

      // filter pakai user agar user lain tidak bisa mengubah tugas orang lain
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, user: req.user.id },
        payload,
        { new: true, runValidators: true },
      );

      if (!updatedTask) {
        return this.sendError(res, "Tugas tidak ditemukan", 404);
      }

      this.sendSuccess(res, updatedTask, "Berhasil memperbarui Tugas...");
    } catch (error) {
      if (error.name === "CastError") {
        return this.sendError(res, "ID tugas tidak valid", 400);
      }
      if (error.name === "ValidationError") {
        return this.sendError(res, this.getValidationMessage(error), 400);
      }
      console.error("[TASK UPDATE]", error.message);
      this.sendError(res, "Gagal memperbarui Tugas...", 500);
    }
  }

  // 4. Method untuk menghapus task berdasarkan id
  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const deletedTask = await Task.findOneAndDelete({
        _id: id,
        user: req.user.id,
      });

      if (!deletedTask) {
        return this.sendError(res, "Tugas tidak ditemukan", 404);
      }

      this.sendSuccess(res, null, "Berhasil menghapus Tugas...");
    } catch (error) {
      if (error.name === "CastError") {
        return this.sendError(res, "ID tugas tidak valid", 400);
      }
      console.error("[TASK DELETE]", error.message);
      this.sendError(res, "Gagal menghapus Tugas...", 500);
    }
  }
}

// Kita export instance dari class ini
module.exports = new TaskController();