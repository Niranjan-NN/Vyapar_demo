import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // 👈 this line tells Vite to listen on all interfaces
  }
});
