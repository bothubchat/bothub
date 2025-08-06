import path from 'path';
import { defineProject } from 'vitest/config';

export default defineProject({
  resolve: {
    alias: {
      '@/ui': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
