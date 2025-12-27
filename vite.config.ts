import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// Plugin to copy index.html to 404.html for GitHub Pages
const copy404Plugin = () => ({
  name: "copy-404",
  closeBundle() {
    try {
      copyFileSync(
        path.resolve(__dirname, "dist/index.html"),
        path.resolve(__dirname, "dist/404.html")
      );
      console.log("✓ Copied index.html to 404.html for GitHub Pages");
    } catch (error) {
      console.error("Failed to copy 404.html:", error);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), copy404Plugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
