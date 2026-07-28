import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` controls the public path. On GitHub Pages the site is served from
// https://<user>.github.io/<repo>/, so the CI workflow sets VITE_BASE to
// "/<repo>/". Locally it defaults to "/".
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  server: { port: 5173, open: false },
});
