<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>

<template>
  <div class="flex flex-col items-center my-5">
    <UserIcon
      :profile-picture="account?.profilePicture"
      :username="account?.username ?? ' '"
      :size="24"
    />

    <h1 class="text-2xl font-semibold mt-3">
      {{ account?.fullname }}
    </h1>

    <a
      class="text-zinc-600 font-semibold"
      :href="`https://bere.al/${account?.username}`"
      target="_blank"
    >
      @{{ account?.username }}
    </a>

    <p class="mt-2">{{ account?.biography }}</p>
  </div>

  <div class="bg-zinc-900 p-3 rounded-lg">
    <h2 class="font-semibold text-lg mb-3">RealMojis</h2>
    <div class="flex flex-wrap justify-center gap-2">
      <RealmojiWithIcon
        v-for="realmoji in account?.realmojis"
        :key="realmoji.emoji"
        class="w-[calc(33.333333%_-_theme('gap.2'))]"
        :realmoji="realmoji"
      />
    </div>
  </div>
</template>
