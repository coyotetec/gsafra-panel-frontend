import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.painel.gsafra.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
