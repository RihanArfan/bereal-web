<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const share = () => {
  if (!navigator.share) return;

  navigator.share({
    title: "BeReal",
    text: "Add me on BeReal",
    url: `https://bere.al/${account.value?.username}`,
  });
};
</script>
<template>
  <div
    class="mb-5 flex cursor-pointer items-center rounded-lg bg-zinc-900 p-4 transition-colors hover:bg-zinc-800"
    @click="share()"
  >
    <UserIcon
      :profile-picture="account?.profilePicture"
      :username="account?.username ?? ' '"
      :size="12"
    />

    <div class="ml-3 flex grow flex-col">
      <p class="text-base font-medium">Invite friends to BeReal</p>
      <p class="text-sm text-gray-500">bere.al/{{ account?.username }}</p>
    </div>

    <ShareIcon class="w-5" />
  </div>

  <RouterView />

  <nav
    class="fixed bottom-0 right-0 left-0 z-20 mb-5 flex justify-center gap-3 rounded-full px-3 py-1 text-lg font-semibold text-gray-400"
  >
    <RouterLink
      :to="{ name: 'friend-suggestions' }"
      active-class="text-white"
      class="transition-colors hover:text-white"
    >
      Suggestions
    </RouterLink>

    <RouterLink
      :to="{ name: 'friends' }"
      exact-active-class="text-white"
      class="transition-colors hover:text-white"
    >
      Friends
    </RouterLink>

    <RouterLink
      :to="{ name: 'friend-requests' }"
      active-class="text-white"
      class="transition-colors hover:text-white"
    >
      Requests
    </RouterLink>
  </nav>
</template>
