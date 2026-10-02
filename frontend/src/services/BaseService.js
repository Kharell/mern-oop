import axios from "axios";

const STORAGE_KEY = "user";
const DEFAULT_API_URL = "http://localhost:5000/api";

// Helper: ambil token dari localStorage (aman walau data rusak/format salah)
export const getStoredToken = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored?.token || null;
  } catch {
    return null;
  }
};

// OOP concept: BaseService sebagai parent class untuk semua service
// (encapsulation: instance axios disimpan sebagai properti class)
class BaseService {
  constructor(baseURL) {
    this.http = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_URL || DEFAULT_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor: otomatis menempelkan token JWT ke setiap request
    this.http.interceptors.request.use((config) => {
      const token = getStoredToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Response interceptor: seragamkan bentuk error untuk semua request
    this.http.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error)),
    );
  }

  // Method standard untuk GET
  async get(url) {
    const response = await this.http.get(url);
    return response.data;
  }

  // Method standard untuk POST
  async post(url, data) {
    const response = await this.http.post(url, data);
    return response.data;
  }

  // Method standard untuk PUT
  async put(url, data) {
    const response = await this.http.put(url, data);
    return response.data;
  }

  // Method standard untuk DELETE
  async delete(url) {
    const response = await this.http.delete(url);
    return response.data;
  }

  // Method handling error agar konsisten di seluruh aplikasi
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { success: false, message: "Server tidak merespon" };
    } else {
      return { success: false, message: error.message };
    }
  }
}

export default BaseService;