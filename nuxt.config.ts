import tailwindContainerQueries from "@tailwindcss/container-queries";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxthq/ui",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@vite-pwa/nuxt",
  ],

  ssr: false,

  // TODO: SSR for landing/auth
  // https://nuxt.com/docs/guide/concepts/rendering#route-rules

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  experimental: {
    renderJsonPayloads: true,
  },

  pwa: {
    registerType: "autoUpdate",
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    client: {
      periodicSyncForUpdates: 3600, // 1 hour
    },
    manifest: {
      name: "BeReal",
      short_name: "BeReal",
      description:
        "Everyday at a different time, everyone is notified simultaneously to capture and share a photo in 2 minutes",
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
      orientation: "portrait",
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      categories: ["entertainment", "photo", "social"],
      related_applications: [
        {
          platform: "play",
          url: "https://play.google.com/store/apps/details?id=com.bereal.ft",
          id: "com.bereal.ft",
        },
        {
          platform: "itunes",
          url: "https://apps.apple.com/app/bereal-your-friends-for-real/id1459645446",
          id: "id1459645446",
        },
      ],
      screenshots: [
        {
          src: "/screenshots/1.webp",
          sizes: "810x1440",
          type: "image/webp",
          platform: "narrow",
          label: "BeReal notification",
        },
        {
          src: "/screenshots/2.webp",
          sizes: "810x1440",
          type: "image/webp",
          platform: "narrow",
          label: "Capturing a BeReal",
        },
        {
          src: "/screenshots/3.webp",
          sizes: "810x1440",
          type: "image/webp",
          platform: "narrow",
          label: "See friends BeReals",
        },
        {
          src: "/screenshots/4.webp",
          sizes: "810x1440",
          type: "image/webp",
          platform: "narrow",
          label: "Comment and react on BeReals",
        },
      ],
    },
  },

  tailwindcss: {
    config: {
      plugins: [tailwindContainerQueries],
    },
  },

  runtimeConfig: {
    berealApiEndpoint: "",
    berealAuthRequestEndpoint: "",
    berealAuthVerifyEndpoint: "",
    googleSecret: "",
    googleConvertEndpoint: "",
    googleRefreshEndpoint: "",

    public: {
      bingMapsKey: "",
    },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
    },
  },
});
