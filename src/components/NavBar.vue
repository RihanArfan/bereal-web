<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>
<template>
  <header
    class="flex justify-between items-center px-4 mb-3 sticky top-0 z-50 py-2 bg-black/[97%] before:content-[''] before:absolute before:rounded-tl-lg before:shadow-black/[97%] before:shadow-[0_-25px_0_0] before:h-[50px] before:bottom-[-50px] before:w-3 before:left-0 after:content-[''] after:absolute after:rounded-tr-lg after:shadow-black/[97%] after:shadow-[0_-25px_0_0] after:h-[50px] after:bottom-[-50px] after:w-3 after:right-0"
  >
    <div class="w-8" />

    <RouterLink :to="{ name: 'friends-feed' }">
      <img
        alt="BeReal logo"
        src="@/assets/text.png"
        class="invert mx-auto"
        width="100"
      />
    </RouterLink>

    <RouterLink :to="{ name: 'account' }">
      <UserIcon
        :profile-picture="account?.profilePicture"
        :username="account?.username ?? ''"
        :size="8"
      />
    </RouterLink>
  </header>
</template>
