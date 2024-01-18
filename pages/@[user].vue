<script setup lang="ts">
const route = useRoute("@user");
</script>

<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <h1 class="font-bold text-2xl">@{{ route.params.user }}</h1>
    <p class="text-lg mt-1">Profiles coming soon</p>

    <NuxtLink to="/" class="mt-5">
      <Button>
        <Icon name="heroicons:arrow-left-20-solid" class="mr-2" />
        Go Home
      </Button>
    </NuxtLink>
  </div>
</template>
