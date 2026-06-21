import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  server: {
    proxy: {
      // Forward all API calls through Vite → no CORS issues in dev
      "/auth": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/products": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/employees": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/customers": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/suppliers": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/sales": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/purchases": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/debts": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/repairs": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/devices": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/spare-parts": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/notifications": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/quotes": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/tasks": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/dashboard": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/images": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
      "/quotations": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
    },
  },
});
