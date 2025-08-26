// @ts-check
import { defineConfig, passthroughImageService  } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: awsAmplify(),
  trailingSlash: 'ignore',
  image: {
    service: passthroughImageService(),
  },
});