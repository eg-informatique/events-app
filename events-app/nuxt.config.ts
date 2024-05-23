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
      strategy: "no_prefix",
      locales :[
        {
          code: "fr",
          iso: "fr-FR",
          name: "Francais",
          file: "fr.json",
          icon: "twemoji:flag-france"
        },
        {
          code: "en",
          iso: "en-EN",
          name: "English",
          file: "EN.json",
          icon: "twemoji:flag-united-kingdom"
        },
        {
          code: "de",
          iso: "de-DE",
          name: "Deutsch",
          file: "DE.json",
          icon: "twemoji:flag-germany"
        },
        {
          code: "it",
          iso: "it-IT",
          name: "Italien",
          file: "IT.json",
          icon: "twemoji:flag-italy"
        },
      ],
      defaultLocale: "fr",
     

  }
})