import BaseService from "./BaseService";

// OOP concept: inheritance (KeuanganService mewarisi BaseService)
// Catatan: backend endpoint sudah tersedia, tinggal dipakai saat UI-nya dibuat.
class KeuanganService extends BaseService {
  constructor() {
    super();
  }

  async fetchKeuangan() {
    return await this.get("/keuangan");
  }

  async addTransaksi(data) {
    return await this.post("/keuangan", data);
  }

  async fetchRingkasan() {
    return await this.get("/keuangan/ringkasan");
  }

  async removeTransaksi(id) {
    return await this.delete(`/keuangan/${id}`);
  }
}

export default new KeuanganService();