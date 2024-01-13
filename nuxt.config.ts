import tailwindContainerQueries from "@tailwindcss/container-queries";
import { pwa } from "./config/pwa";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@vite-pwa/nuxt",
  ],

  pwa,

  image: {
    format: ["avif", "webp"],
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://cdn.bereal.network/",
    },
  },

  colorMode: {
    preference: "dark",
  },

  tailwindcss: {
    config: {
      plugins: [tailwindContainerQueries],
    },
  },

  // TODO: SSR for landing/auth
  // https://nuxt.com/docs/guide/concepts/rendering#route-rules
  ssr: false,

  runtimeConfig: {
    berealApiEndpoint: "",
    berealAuthRequestEndpoint: "",
    berealAuthVerifyEndpoint: "",

    public: {
      bingMapsKey: "",
    },
  },

  experimental: {
    typedPages: true,
  },

  future: {
    typescriptBundlerResolution: true,
  },

  devtools: { enabled: true },
});
