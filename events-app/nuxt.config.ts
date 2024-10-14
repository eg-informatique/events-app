// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui", "@nuxtjs/i18n"],

  devtools: { 
    enabled: true 
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    githubClientId : process.env.GITHUB_CLIENTID,
    githubClientSecret : process.env.GITHUB_SECRET,
    googleAuthClientId : process.env.GOOGLE_AUTH_CLIENTID,
    googleAuthClientSecret : process.env.GOOGLE_AUTH_SECRET,
    public:{
      googleMapApiKey : process.env.GOOGLE_MAP_API_KEY
 
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  auth: {
    baseURL: 'https://swiss-events.org',
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    globalAppMiddleware: true,
    provider: {
        type: 'authjs'
    },
  
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
          file: "en.json",
          icon: "twemoji:flag-united-kingdom"
        },
        {
          code: "de",
          iso: "de-DE",
          name: "Deutsch",
          file: "de.json",
          icon: "twemoji:flag-germany"
        },
        {
          code: "it",
          iso: "it-IT",
          name: "Italiano",
          file: "it.json",
          icon: "twemoji:flag-italy"
        },
      ],
      defaultLocale: "fr",
  },

  compatibilityDate: "2024-07-13"
})