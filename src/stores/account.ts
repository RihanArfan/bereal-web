import { ref } from "vue";
import { defineStore } from "pinia";

import { useApi } from "@/composables/useApi";
import type { Account } from "@/types/types";

export const useAccountStore = defineStore("account", () => {
  const account = ref<Account>();

  const fetchAccount = async () => {
    console.log("Fetching account");
    account.value = await useApi().get("person/me").json<Account>();
    console.log(account.value);
  };

  return { account, fetchAccount };
});
