import ky, { type HTTPError } from "ky";
import { useAuthStore } from "@/stores/auth";

export const useApi = () => {
  const authStore = useAuthStore();

  return ky.create({
    prefixUrl: "/api/",
    hooks: {
      beforeRequest: [
        async () => {
          if (authStore.isExpired) await authStore.refreshToken();
        },
        ({ headers }) => {
          headers.set("Authorization", `Bearer ${authStore.token}`);
        },
      ],
    },
  });
};

export const useApiFunction = () => {
  const authStore = useAuthStore();

  return ky.create({
    prefixUrl: "/api/functions/",
    hooks: {
      beforeRequest: [
        async () => {
          if (authStore.isExpired) await authStore.refreshToken();
        },
        ({ headers }) => {
          headers.set("Authorization", `Bearer ${authStore.token}`);
        },
      ],
    },
  });
};
