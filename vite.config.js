import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      Modules: path.resolve(__dirname, './src/modules'),
    },
  },
});
