// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  nitro: {
    prerender: {
      routes: ['/todo/detail/1', '/todo/detail/2', '/todo/detail/3'],
    }
  },
  experimental: {
    appManifest: false
  }
})
