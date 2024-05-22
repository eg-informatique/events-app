// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui", "@nuxtjs/i18n"],
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
    gray: 'cool',
    icons: ['majesticons', 'mdi'],
  },
  i18n: {
      lazy: true,
      langDir: "locales",
      strategy: "prefix_except_default",
      locales :[
        {
          code: "fr-FR",
          iso: "fr-FR",
          name: "Francais",
          file: "fr.json"
        },
        {
          code: "en-EN",
          iso: "en-EN",
          name: "English",
          file: "EN.json"
        },
        {
          code: "de-DE",
          iso: "de-DE",
          name: "Deutsch",
          file: "DE.json"
        },
        {
          code: "it-IT",
          iso: "it-IT",
          name: "Italien",
          file: "IT.json"
        },
      ],
      defaultLocale: "FR",
     

  }
})