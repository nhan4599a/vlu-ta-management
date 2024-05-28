import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@main": path.resolve(__dirname, "./src"),
      "@redux": path.resolve(__dirname, "./src/features")
    },
  },
  optimizeDeps: {
    exclude: ["react-data-export"]
  },
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  }
});
