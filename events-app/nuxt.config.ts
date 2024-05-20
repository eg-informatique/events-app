// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui"],
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
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    globalAppMiddleware: true,
    provider: {
        type: 'authjs'
    }
  },
  ui: {
    primary: 'green',
    gray: 'cool'
  }
})