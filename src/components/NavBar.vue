<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>
<template>
  <header
    class="max-w-lg mx-auto left-0 right-0 pb-3 fixed w-full z-10 top-0 bg-gradient-to-b from-black to-transparent"
  >
    <nav
      class="flex justify-between items-center align-center px-4 top-0 z-50 pt-2"
    >
      <button
        v-if="$route.name === 'profile'"
        class="w-6 h-6 cursor-pointer"
        @click="$router.back()"
      >
        <BackIcon class="hover:fill-gray-200" />
      </button>
      <RouterLink v-else to="/" class="w-6 h-6 pt-1">
        <AccountIcon class="hover:fill-gray-200" />
      </RouterLink>

      <RouterLink :to="{ name: 'friends-feed' }">
        <img
          alt="BeReal logo"
          src="@/assets/text.png"
          class="invert mx-auto"
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
