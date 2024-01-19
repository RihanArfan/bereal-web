<script setup lang="ts">
const route = useRoute("@user");
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">@{{ route.params.user }}</h1>
    <p class="mt-1 text-lg">Profiles coming soon</p>

    <NuxtLink to="/" class="mt-5">
      <Button>
        <Icon name="heroicons:arrow-left-20-solid" class="mr-2" />
        Go Home
      </Button>
    </NuxtLink>
  </div>
</template>
