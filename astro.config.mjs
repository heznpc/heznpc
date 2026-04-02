import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  site: 'https://heznpc.github.io',
  base: '/heznpc',
});
