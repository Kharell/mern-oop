import axios from "axios";

class BaseService {
  constructor(baseURL) {
    this.http = axios.create({
      baseURL: baseURL || "http://localhost:5000/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Method standard untuk GET
  async get(url) {
    try {
      const response = await this.http.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Method standard untuk POST
  async post(url, data) {
    try {
      const response = await this.http.post(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Method standard untuk PUT
  async put(url, data) {
    try {
      const response = await this.http.put(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Method standard untuk DELETE
  async delete(url) {
    try {
      const response = await this.http.delete(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Method handling error (Sudah dirapikan agar konsisten)
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { message: "Server tidak merespon" };
    } else {
      return { message: error.message };
    }
  }
}

export default BaseService;