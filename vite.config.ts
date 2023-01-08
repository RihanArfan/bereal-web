import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8788",
    },
  },
  plugins: [
    vue(),
    Components({}),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: ["vue", "vue-router"],
      dirs: ["./src/composables", "./src/stores"],
      dts: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true,
      // },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "/icons/apple-touch-icon.png"],
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
        shortcuts: [
          {
            name: "Open discovery",
            short_name: "Discovery",
            url: "/discovery",
            description: "View BeReals posted publicly",
            icons: [
              {
                src: "/icons/shortcuts/face-grin-stars-regular.png",
                type: "image/png",
                sizes: "512x512",
              },
            ],
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
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
