<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const route = useRoute();

const scrollToTop = () => {
  if (route.name === "friends-feed")
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
};
</script>
<template>
  <header
    class="fixed left-0 right-0 top-0 z-10 mx-auto w-full max-w-lg shadow-[inset_0_30px_30px_-15px_rgba(0,0,0,0.8)] sm:shadow-[inset_0_28px_28px_-17px_rgba(0,0,0,0.7)]"
  >
    <nav
      class="align-center top-0 z-50 flex items-center justify-between px-4 pt-2"
    >
      <button
        v-if="
          $route.name !== 'friends-feed' && $route.name !== 'discovery-feed'
        "
        class="h-6 w-6 cursor-pointer"
        @click="$router.back()"
      >
        <BackIcon class="hover:fill-gray-200" />
      </button>
      <RouterLink v-else :to="{ name: 'friends' }" class="h-6 w-6 pt-1">
        <AccountIcon class="hover:fill-gray-200" />
      </RouterLink>

      <RouterLink :to="{ name: 'friends-feed' }">
        <img
          alt="BeReal logo"
          src="@/assets/text.png"
          class="mx-auto invert"
          width="90"
          @click="scrollToTop"
        />
      </RouterLink>

      <RouterLink
        v-if="account"
        :to="{ name: 'profile', params: { username: account?.username } }"
      >
        <UserIcon
          :profile-picture="account?.profilePicture"
          :username="account?.username ?? ''"
          :size="8"
        />
      </RouterLink>

      <UserIcon v-else username=" " :size="8" />
    </nav>
  </header>
</template>
