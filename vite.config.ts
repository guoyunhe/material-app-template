/// <reference types="vitest" />
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import adsense from 'vite-plugin-adsense';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @see https://vitejs.dev/config/ */
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  plugins: [react(), tsconfigPaths(), adsense()],
  /** @see https://vitest.dev/config/ */
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
  },
});
