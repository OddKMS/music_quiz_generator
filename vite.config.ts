/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#helpers': path.resolve(__dirname, './src/lib/helpers'),
      '#lib': path.resolve(__dirname, './src/lib'),
      '#components': path.resolve(__dirname, './src/client/components'),
      '#server': path.resolve(__dirname, './src/server'),
      '#hooks': path.resolve(__dirname, './src/client/hooks'),
      '#musicquizgenerator/types': path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [react(), ssr()],
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    passWithNoTests: true,
  },
  server: {
    middlewareMode: true,
  },
  // for development only - move over to Server-Side
  // rendering to keep secrets safe when moving to prod
  define: {
    'import.meta.env.SPOTIFY_CLIENT_ID': JSON.stringify(
      process.env.SPOTIFY_CLIENT_ID,
    ),
    'import.meta.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(
      process.env.SPOTIFY_CLIENT_SECRET,
    ),
  },
});
