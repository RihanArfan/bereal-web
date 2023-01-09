<script setup lang="ts">
import ky from "ky";
import { useAuthStore } from "@/stores/auth";
import type { RequestCodeResponse } from "@/types/auth";

const router = useRouter();
const authStore = useAuthStore();

const phone = ref("");
const country = ref("44");
const isSendingCode = ref(false);
const isValidInputFormat = ref<boolean>();

watch(country, (value) => {
  if (isNaN(parseInt(value.slice(-1)))) country.value = value.slice(0, -1); // if character is not a number, remove it
  if (value.length > 3) country.value = value.slice(0, 3); // if value is longer than 3 digits, trim it to 3
});

watch(phone, (value) => {
  const regex = new RegExp("^[0-9]+$");
  const isDigits = regex.test(value);
  isValidInputFormat.value =
    !!value && value.length < 20 && value.length > 8 && isDigits;
});

const requestCode = async () => {
  const deviceId = crypto.getRandomValues(new Uint32Array(8)).join("");
  authStore.deviceId = deviceId;
  isSendingCode.value = true;
  const phoneNumber = `+${country.value}${phone.value.trim()}`;

  const response = await ky
    .post("/api/auth/login/request-code", {
      json: { deviceId, phone: phoneNumber },
    })
    .json<RequestCodeResponse>();

  authStore.loginRequestId = response.vonageRequestId;
  authStore.loginPhone = phoneNumber;
  router.push({ name: "login-code" });
};
</script>

<template>
  <label for="country-code" class="sr-only">Country Code</label>
  <label for="phone" class="sr-only">Phone Number</label>

  <p
    v-if="!isValidInputFormat && phone.length !== 0"
    class="mb-2 ml-1 text-red-500"
  >
    Enter a valid phone number (+44 000 0000 000)
  </p>

  <div
    class="flex rounded-lg border-4 border-zinc-800 bg-zinc-900 px-3 py-3 text-xl font-semibold transition-colors focus-within:border-zinc-700"
  >
    +

    <input
      id="country-code"
      v-model="country"
      class="flex w-6 min-w-0 shrink border-transparent bg-transparent placeholder:text-lg placeholder:font-normal placeholder:text-zinc-500 focus:border-transparent focus:outline-none focus:ring-0"
      placeholder="44"
      type="tel"
      title="Country Code (Format: +44)"
      autocomplete="tel-country-code"
      focus
    />

    <input
      id="phone"
      v-model="phone"
      class="ml-2 flex grow border-transparent bg-transparent placeholder:text-lg placeholder:font-normal placeholder:text-zinc-500 focus:border-transparent focus:outline-none focus:ring-0"
      placeholder="Enter your phone number"
      type="tel"
      title="Phone Number (Format: 999 9999 999)"
      autocomplete="tel-national"
      focus
    />
  </div>

  <AuthButton
    :disabled="!isValidInputFormat || isSendingCode || !country"
    @click="requestCode"
  >
    Login
  </AuthButton>
</template>
