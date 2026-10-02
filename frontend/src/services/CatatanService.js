import BaseService from "./BaseService";

// OOP concept: inheritance (CatatanService mewarisi BaseService)
// Catatan: backend endpoint sudah tersedia, tinggal dipakai saat UI-nya dibuat.
class CatatanService extends BaseService {
  constructor() {
    super();
  }

  async fetchCatatan() {
    return await this.get("/catatan");
  }

  async addCatatan(data) {
    return await this.post("/catatan", data);
  }

  async updateCatatan(id, updatedData) {
    return await this.put(`/catatan/${id}`, updatedData);
  }

  async removeCatatan(id) {
    return await this.delete(`/catatan/${id}`);
  }
}

export default new CatatanService();