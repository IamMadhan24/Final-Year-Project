// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  build: {
    transpile: ["vue-toastification"],
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.SITE_API_URL || "http://localhost:5000",
    },
  },
});
