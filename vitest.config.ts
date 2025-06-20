/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test Environment
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    
    // Performance
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 4,
      },
    },
    
    // Coverage Configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
        '**/__tests__/**',
        '**/*.test.*',
        '**/*.spec.*',
        'src/vite-env.d.ts',
        'dist/',
        'build/',
        'public/',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 80,
          lines: 80,
        },
      },
    },
    
    // File Patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'src/**/__tests__/**/*.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules/',
      'dist/',
      'build/',
      '**/*.e2e.{test,spec}.{js,ts,jsx,tsx}',
    ],
    
    // Test Timeout
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Watch Options
    watch: {
      ignore: ['node_modules/', 'dist/', 'build/'],
    },
    
    // UI Configuration
    ui: true,
    open: false,
    
    // Reporter Configuration
    reporter: ['verbose', 'html'],
    outputFile: {
      html: './test-results/html/index.html',
      json: './test-results/json/results.json',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});