import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_SERVER_IP: JSON.stringify(process.env.VITE_SERVER_IP),
      VITE_SERVER_PORT: JSON.stringify(process.env.VITE_SERVER_PORT),
      VITE_SOCKET_PORT: JSON.stringify(process.env.VITE_SOCKET_PORT),
    },
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
});
