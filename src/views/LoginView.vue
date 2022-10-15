<script setup lang="ts">
import ky from "ky";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const phone = ref<string>();
const isSendingCode = ref(false);

const updateRefreshToken = async () => {
  if (!phone.value || (phone.value?.length || 0) < 10) return;

  // authStore.setRefreshToken(token.value);
  // await authStore.refreshToken();
  // router.push({ name: "friends-feed" });
};
</script>

<template>
  <div class="text-center">
    <img
      alt="BeReal logo"
      src="@/assets/text.png"
      class="mx-auto w-1/3 invert"
      width="800"
    />
    <p class="mt-5 text-2xl">Your Friends. For Real.</p>
  </div>

  <div
    class="container fixed bottom-0 right-0 left-0 mx-auto mb-5 max-w-lg px-2"
  >
    <label for="country-code" class="sr-only">Phone Number</label>
    <div
      class="flex rounded-lg border-4 border-zinc-800 bg-zinc-900 px-3 py-3 text-xl font-semibold"
    >
      <input
        id="phone"
        v-model="phone"
        class="w-full border-transparent bg-transparent placeholder:text-lg placeholder:font-normal placeholder:text-zinc-500 focus:border-transparent focus:outline-none focus:ring-0"
        placeholder="Enter your phone number"
        type="tel"
        title="Phone Number (Format: +99 999 9999 999)"
        autocomplete="tel"
        focus
      />
    </div>

    <button
      class="mt-5 w-full rounded bg-white p-4 font-bold text-black transition-colors duration-500 hover:bg-gray-300"
      type="button"
      :disabled="!phone || isSendingCode"
      @click="updateRefreshToken"
    >
      Login
    </button>

    <p class="mt-5 text-center text-xs text-gray-500">
      This is a
      <a
        href="https://file.properties"
        target="_blank"
        class="underline decoration-dotted"
        >student project</a
      >
      and not affiliated with
      <a href="https://bereal.com" referrerpolicy="noreferrer" target="_blank"
        >BeReal</a
      >.
    </p>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(24 24 27) inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: white !important;
}
</style>
