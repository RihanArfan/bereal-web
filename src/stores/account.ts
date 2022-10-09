import { ref } from "vue";
import { defineStore } from "pinia";

import { useApi } from "@/composables/useApi";
import type { Account } from "@/types/users";

export const useAccountStore = defineStore("account", () => {
  const account = ref<Account>();

  const fetchAccount = async () =>
    (account.value = await useApi().get("person/me").json<Account>());

  return { account, fetchAccount };
});
