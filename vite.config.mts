import { viteConfig } from '@kurone-kito/vite-lib-config';

export default viteConfig(
  {
    build: {
      rolldownOptions: { output: { entryFileNames: 'bin.mjs', format: 'es' } },
      rollupOptions: { output: { entryFileNames: 'bin.mjs', format: 'es' } },
      target: 'node22.22',
    },
  },
  { entries: 'bin.mts', sea: true },
);
