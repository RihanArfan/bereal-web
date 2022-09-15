import { ref, computed } from "vue";
import { defineStore } from "pinia";
import ky from "ky";

import jwtDecode, { type JwtPayload } from "jwt-decode";
import { useLocalStorage } from "@vueuse/core";

import type { TokenRequest } from "@/types/types";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>();
  const refresh = useLocalStorage("auth/refresh", "");

  const userId = computed(() => {
    if (!token.value) return undefined;
    const decoded = jwtDecode<JwtPayload>(token.value);
    return decoded?.sub;
  });

  const isLoggedIn = computed(() => refresh.value.length !== 0);

  const isExpired = computed((): boolean => {
    if (!token.value) return true;
    const decoded = jwtDecode<JwtPayload>(token.value);
    return (decoded.exp ?? 0) < Date.now() / 1000;
  });

  const refreshToken = async () => {
    if (!isLoggedIn.value) {
      console.log("Missing refresh token!");
      return false;
    }

    const { access_token, refresh_token } = await ky
      .post("/api/auth/token", { json: { refresh_token: refresh.value } })
      .json<TokenRequest>();

    token.value = access_token;
    refresh.value = refresh_token;
  };

  return { token, userId, isLoggedIn, isExpired, refreshToken };
});
