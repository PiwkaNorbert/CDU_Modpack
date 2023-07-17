import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "https://api.playcdu.co": {
        target: "https://api.playcdu.co",
        changeOrigin: true,
      },
    },
  },
});
