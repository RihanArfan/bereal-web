import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";

import { registerSW } from "virtual:pwa-register";

import App from "./App.vue";
import router from "./router";

import "./assets/styles.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");

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
