import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import ky, { type Options } from "ky";

import jwtDecode, { type JwtPayload } from "jwt-decode";
import { useLocalStorage } from "@vueuse/core";

import type { TokenResponse } from "@/types/types";

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

    try {
      const requestOptions: Options = {
        json: { refresh_token: refresh.value },
        hooks: {
          afterResponse: [
            async (request, options, response) => {
              if (response.status === 403) {
                console.error(request);

                refresh.value = "";

                const router = useRouter();
                router.push({
                  name: "login",
                  query: { error: "refresh token invalid" },
                });
              }
            },
          ],
        },
      };

      const { access_token, refresh_token } = await ky
        .post("/api/auth/token", requestOptions)
        .json<TokenResponse>();

      token.value = access_token;
      refresh.value = refresh_token;
    } catch (error) {
      console.error(error);
    }
  };

  const setRefreshToken = (refreshToken: string) =>
    (refresh.value = refreshToken);

  return {
    token,
    userId,
    isLoggedIn,
    isExpired,
    refreshToken,
    setRefreshToken,
  };
});
