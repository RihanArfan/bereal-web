<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const token = ref<string>();

const updateRefreshToken = async () => {
  if (!token.value || (token.value?.length || 0) < 10) return;

  authStore.setRefreshToken(token.value);
  await authStore.refreshToken();
  router.push({ name: "friends-feed" });
};
</script>

<template>
  <h1 class="text-3xl font-semibold">Login</h1>
  <p class="mb-5">⚠️ The login system is being developed.</p>

  <h2 class="text-xl font-semibold">Developer Login</h2>
  <label class="my-1 block" for="token">Refresh token</label>
  <input
    id="token"
    v-model="token"
    class="mb-5 w-full rounded border py-1 px-2 font-mono text-gray-700"
    aria-label="Refresh token input"
  />
  <button
    class="rounded bg-white py-2 px-4 font-bold text-black hover:bg-gray-300"
    type="button"
    @click="updateRefreshToken"
  >
    Login >
  </button>
</template>
