import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  // Allow overriding Vite's cache dir (useful on low-disk systems).
  // Example (PowerShell):
  //   $env:VITE_CACHE_DIR = "D:\\vite-cache\\code-curator"
  //   npm run dev
  cacheDir:
    process.env.VITE_CACHE_DIR ??
    path.resolve(process.cwd(), "node_modules", ".vite"),
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
      ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer(),
        ),
        await import("@replit/vite-plugin-dev-banner").then((m) =>
          m.devBanner(),
        ),
      ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  root: path.resolve(process.cwd(), "client"),
  optimizeDeps: {
    // Saves disk space by skipping source maps in the deps pre-bundle cache.
    esbuildOptions: {
      sourcemap: false,
    },
  },
  build: {
    outDir: path.resolve(process.cwd(), "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
