import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";

import pwaOptions from "./src/pwaOptions";

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
    VitePWA(pwaOptions),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
