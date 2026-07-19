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
  optimizeDeps: {
    entries: ["index.html"],
  },
  server: {
    watch: {
      ignored: ["**/android/**", "**/electron/**", "**/release/**", "**/dist/**"],
    },
    proxy: {
      // Forward all API calls through Vite → no CORS issues in dev
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        // Remove /api prefix before forwarding to backend
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
