import path from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss(), nitro()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  nitro: {
    serverDir: "./src",
  },
});
