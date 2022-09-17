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
  <label class="block my-1" for="token">Refresh token</label>
  <input
    class="border rounded w-full py-1 px-2 text-gray-700 mb-5 font-mono"
    v-model="token"
    id="token"
    aria-label="Refresh token input"
  />
  <button
    class="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
    type="button"
    @click="updateRefreshToken"
  >
    Login >
  </button>
</template>
