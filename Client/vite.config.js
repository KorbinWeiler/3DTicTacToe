import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // .env lives at the repo root, one level above this Client/ dir.
  // Vite exposes VITE_-prefixed vars from here as import.meta.env.*
  envDir: path.resolve(__dirname, '..'),
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
});
