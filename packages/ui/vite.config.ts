import { join } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

export const appPath: string = __dirname;

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      name: 'BothubUI',
      entry: join(appPath, './src/index.ts'),
      fileName: 'index',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components', 'framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          'framer-motion': 'framerMotion'
        }
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(appPath, './src')
      }
    ]
  }
});