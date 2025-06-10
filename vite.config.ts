import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");
  const basePath = process.env.BASE_PATH ?? "/clinical-case-compass/";
  return {
    // When deploying under a subpath (e.g. GitHub Pages),
    // specify the base path so asset URLs resolve correctly.
    // Set the BASE_PATH environment variable to override this value.
    base: basePath,
    envPrefix: "VITE_",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
