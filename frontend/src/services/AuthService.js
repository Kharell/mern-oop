import BaseService from "./BaseService";
import { getStoredToken } from "./BaseService";

// OOP concept: inheritance (AuthService mewarisi BaseService)
class AuthService extends BaseService {
  constructor() {
    // memanggil constructor BaseService dengan URL default
    super();
    this.storageKey = "user";
  }

  async register(name, email, password) {
    return await this.post("/auth/register", { name, email, password });
  }

  async login(email, password) {
    // post() mengembalikan body respons: { success, message, data }
    const response = await this.post("/auth/login", { email, password });

    // Ambil payload di dalamnya -> { token, user }
    const session = response?.data || response;

    // Simpan token & data user ke localStorage agar tidak hilang saat refresh
    if (session?.token) {
      localStorage.setItem(this.storageKey, JSON.stringify(session));
    }

    return session;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  // Mengembalikan objek { token, user } yang tersimpan
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch {
      return null;
    }
  }

  // Mengembalikan data user saja (tanpa token)
  getCurrentUser() {
    const session = this.getSession();
    return session?.user || session || null;
  }

  isAuthenticated() {
    return Boolean(getStoredToken());
  }
}

export default new AuthService();