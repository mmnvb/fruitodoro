import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(async () => ({
  plugins: [vue()],
  clearScreen: false,

  // do not change port
  server: {
    port: 1420,
    strictPort: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  envPrefix: ["VITE_", "TAURI_"],
}));
