import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/',
  resolve: {
    alias: {
      assets: '/src/assets/',
      components: '/src/components/',
      hooks: '/src/hooks/',
      routes: '/src/routes/',
      pages: '/src/pages/',
      theme: '/src/theme/',
      apollo: '/src/apollo/',
      types: '/src/types/',
      UI: '/src/UI/',
      utils: '/src/utils/',
    },
  },
  server: {
    host: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/theme/variables.scss" as *;`,
      },
    },
  },
})
