// CRUD tODO List

const baseController = require("./baseController");
const Task = require("../models/task");

// OOP concept: inheritance (taskController mewarisi baseController)
class taskController extends baseController {
  // 1. Method untuk membuat task baru
  async createTask(req, res) {
    try {
      const { title } = req.body;
      const newTask = await Task.create({ title });

      super.sendSuccess(res, newTask, "Berhasil membuat Tugas baru...", 201);
    } catch (error) {
      super.sendError(res, error.message, 400);
    }
  }

  // 2. Method untuk mengambil semua task
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });

      super.sendSuccess(res, tasks, "Berhasil mengambil semua Tugas...");
    } catch (error) {
      super.sendError(res, "Gagal mengambil semua Tugas...", 500);
    }
  }

  // 3. Method untuk memperbarui task (Edit & Toggle Status)
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true, runValidators: true }, // new: true mengembalikan data setelah update
      );

      if (!updatedTask) {
        return super.sendError(res, "Tugas tidak ditemukan", 404);
      }

      super.sendSuccess(res, updatedTask, "Berhasil memperbarui Tugas...");
    } catch (error) {
      super.sendError(res, "Gagal memperbarui tugas: " + error.message, 500);
    }
  }

  // 4. Method untuk menghapus task berdasarkan id
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return super.sendError(res, "Tugas tidak ditemukan", 404);
      }

      super.sendSuccess(res, null, "Berhasil menghapus Tugas...");
    } catch (error) {
      super.sendError(res, error.message, 400);
    }
  }
}

// Kita export instance dari kelas ini
module.exports = new taskController();
