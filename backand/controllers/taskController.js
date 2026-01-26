const baseController = require("./baseController");
const Task = require("../models/task");

// OOP concept: inheritance (taskController mewariisi baseController)
class taskController extends baseController {
  // method untuk membuat task baru
  async createTask(req, res) {
    try {
      const { title } = req.body;
      const newTask = await Task.create({ title });
      super.sendSuccess(res, newTask, "Berhasil membuat Tugas baru ...", 201);
      // cek di console terminal
      // console.log("Berhasil membuat Tugas baru ...", newTask);
    } catch (error) {
      super.sendError(res, error.message, 400);
    }
  }

  // Method untuk mengambil semua task
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      // kita panggil method sendSuccess dari perent (baseController) untuk mengirim respon
      super.sendSuccess(res, tasks, "Berhasil mengambil semua Tugas ...");
      // cek di console terminal
      //console.log("Berhasil mengambil semua Tugas ...", tasks);
    } catch (error) {
      // kita panggil method sendError dari perent (baseController) untuk mengirim respon eror
      super.sendError(res, "Gagal mengambil semua Tugas ...");
    }
  }

  // method untuk menghapus task berdasarkan id
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      super.sendSuccess(res, null, "Berhasil menghapus Tugas ...");
      // cek di console terminal
      // console.log("data dengan id",id,"berhasil dihapus");
    } catch (error) {
      super.sendError(res, error.message, 400);
    }
  }
}

// kita export interface dari kelas ini
module.exports = new taskController();
