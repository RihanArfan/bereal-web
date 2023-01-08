import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { registerSW } from "virtual:pwa-register";

import App from "@/App.vue";
import router from "@/router";

import { useAccountStore } from "@/stores/account";

import "@/assets/styles.css";

const app = createApp(App);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
      },
    },
  },
  clientPersister: (queryClient) => {
    return persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({ storage: localStorage }),
    });
  },
};

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, vueQueryOptions);

app.mount("#app");

const authStore = useAuthStore();
const accountStore = useAccountStore();
if (authStore.isLoggedIn) accountStore.fetchAccount();

const intervalMS = 60 * 60 * 500; // 30 minutes
registerSW({
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return;
        if ("connection" in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, { cache: "no-store" });

        if (resp?.status === 200) await r.update();
      }, intervalMS);
  },
});
