export default defineNuxtConfig({
  compatibilityDate: '2025-09-30',
  srcDir: 'app/',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/styles/main.scss'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    build: {
      target: 'esnext',
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
});
