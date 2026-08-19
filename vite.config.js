import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => ({
  server: {
    host: "0.0.0.0",
    port: 9000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Strip console/debugger from production bundles only; dev keeps logging.
  esbuild: command === "build" ? { drop: ["console", "debugger"] } : undefined,
}));
