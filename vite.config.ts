import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  // Only use base path for GitHub Pages deployment
  const isGitHubPages = env.VITE_DEPLOY_TARGET === 'github-pages';
  
  return {
    // Set base path only for GitHub Pages, leave empty for other deployments
    base: isGitHubPages ? "/clinical-case-compass/" : "/",
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
