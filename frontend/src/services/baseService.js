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

  // methods standard untuk menangani responss
  async get(url) {
    try {
      const response = await this.http.get(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async post(url, data) {
    try {
      const response = await this.http.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  async delete(url) {
    try {
      const response = await this.http.delete(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  // Method hendeling error
  handleError(error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { massege: "Server tidak merespon" };
    } else {
      return { message: error.message };
    }
  }
}

export default BaseService;
