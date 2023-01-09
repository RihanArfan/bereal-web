<script setup lang="ts">
import ky, { HTTPError } from "ky";
import { useAuthStore } from "@/stores/auth";
import type { ExchangeRefreshResponse } from "@/types/auth";

const router = useRouter();
const authStore = useAuthStore();

const code = ref("");
const isVerifyingCode = ref(false);
const isValidCode = ref(true);
const isValidInputFormat = ref<boolean>();

watch(code, (value) => {
  const number = value ?? 0;
  if (number.toString().length > 6) code.value = number.toString().slice(0, 6); // if code is longer than 6 digits, trim it to 6
  if (isNaN(parseInt(value.slice(-1)))) code.value = value.slice(0, -1); // if character is not a number, remove it

  isValidInputFormat.value = number.toString().length === 6;
  isValidCode.value = true;
});

const validateCode = async () => {
  if (!isValidInputFormat.value) return;
  isVerifyingCode.value = true;

  try {
    const response = await ky
      .post("/api/auth/login/check-code", {
        json: {
          request_id: authStore.loginRequestId,
          code: code.value,
        },
      })
      .json<ExchangeRefreshResponse>();

    authStore.loginRequestId = "";

    authStore.setRefreshToken(response.refreshToken);
    authStore.token = response.idToken;

    const accountStore = useAccountStore();
    accountStore.fetchAccount();

    router.push({ name: "friends-feed" });
  } catch (error) {
    if (!(error instanceof HTTPError)) throw error;
    if (error.response.status === 401) isValidCode.value = false;
    if (error.response.status === 410) return router.push({ name: "login" });
  }
};

const cancel = () => {
  authStore.loginRequestId = "";
  router.push({ name: "login" });
};
</script>

<template>
  <label for="code" class="sr-only">SMS Code</label>
  <p v-if="!isValidCode" class="mb-2 ml-1 text-red-500">
    Incorrect login code. Please try again.
  </p>

  <div class="mx-1 mb-2 flex justify-between text-sm">
    <p class="text-gray-100">
      Enter the code sent to: {{ authStore.loginPhone }}
    </p>
    <button class="text-gray-500" @click="() => cancel()">Go Back</button>
  </div>

  <input
    id="code"
    v-model="code"
    class="w-full rounded-lg border-4 border-zinc-800 bg-zinc-900 px-3 py-3 text-xl font-semibold transition-colors placeholder:text-lg placeholder:font-normal placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-0"
    placeholder="Enter the code sent to your phone"
    type="text"
    pattern="[0-9]*"
    autocomplete="one-time-code"
    focus
  />

  <AuthButton :disabled="!isValidInputFormat" @click="() => validateCode()">
    Login
  </AuthButton>
</template>
