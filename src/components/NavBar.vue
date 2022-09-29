<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>
<template>
  <header
    class="fixed left-0 right-0 top-0 z-10 mx-auto w-full max-w-lg bg-gradient-to-b from-black to-transparent pb-3"
  >
    <nav
      class="align-center top-0 z-50 flex items-center justify-between px-4 pt-2"
    >
      <button
        v-if="$route.name === 'profile'"
        class="h-6 w-6 cursor-pointer"
        @click="$router.back()"
      >
        <BackIcon class="hover:fill-gray-200" />
      </button>
      <RouterLink v-else to="/" class="h-6 w-6 pt-1">
        <AccountIcon class="hover:fill-gray-200" />
      </RouterLink>

      <RouterLink :to="{ name: 'friends-feed' }">
        <img
          alt="BeReal logo"
          src="@/assets/text.png"
          class="mx-auto invert"
          width="90"
        />
      </RouterLink>

      <RouterLink :to="{ name: 'profile' }">
        <UserIcon
          :profile-picture="account?.profilePicture"
          :username="account?.username ?? ''"
          :size="8"
        />
      </RouterLink>
    </nav>
  </header>
</template>
