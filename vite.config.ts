import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
          'supabase-vendor': ['@supabase/supabase-js'],
          // Feature chunks
          'auth-feature': [
            './src/features/auth'
          ],
          'cases-feature': [
            './src/features/cases'
          ],
          'dashboard-feature': [
            './src/features/dashboard'
          ]
        }
      }
    },
    // Enable source maps for production debugging
    sourcemap: mode === 'development',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react'
    ],
    exclude: ['@supabase/supabase-js']
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: mode === 'development',
  },
  // Performance optimizations
  esbuild: {
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
