// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', "@sidebase/nuxt-auth"],
  devtools: { 
    enabled: true 
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
        type: 'authjs'
    }
  },
})