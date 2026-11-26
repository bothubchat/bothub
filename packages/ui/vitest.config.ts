import path from 'path';
import { defineProject } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineProject({
  plugins: [vanillaExtractPlugin()],
  resolve: { alias: { '@/ui': path.resolve(__dirname, './src') } },
  test: { environment: 'jsdom', setupFiles: ['./tests/tests.setup.ts'] },
});
