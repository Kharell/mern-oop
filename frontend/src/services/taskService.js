import BaseService from "./baseService";

class TaskService extends BaseService {
  constructor() {
    // memanggil constructor BaseServices dengan URL default
    super();
  }
  async fetchTasks() {
    return await this.get("/tasks");
  }

  async addTask(title) {
    return await this.post("/tasks", { title });
  }

  async removeTask(id) {
    return await this.delete(`/tasks/${id}`);
  }
}

export default new TaskService();
