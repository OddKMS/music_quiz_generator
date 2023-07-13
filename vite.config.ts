/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@helpers': path.resolve(__dirname, './src/lib/helpers'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
  },
  server: {
    watch: { usePolling: true },
    fs: {
      strict: false,
      allow: [searchForWorkspaceRoot(process.cwd()), 'src/lib/secrets'],
    },
  },
});
