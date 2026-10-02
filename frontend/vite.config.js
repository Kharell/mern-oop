import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Backend URL diambil dari .env (VITE_API_PROXY_TARGET),
  // dipakai untuk fitur proxy "/api" -> backend saat development
  const env = loadEnv(mode, import.meta.dirname, "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:5000";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});