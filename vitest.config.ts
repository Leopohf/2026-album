import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [angular(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/main.ts',
        'src/main.server.ts',
        'src/server.ts',
        'src/test-setup.ts',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/app/data/**',
        'src/app/app.config.ts',
        'src/app/app.config.server.ts',
        'src/app/app.routes.ts',
        'src/app/app.routes.server.ts',
      ],
    },
  },
});
