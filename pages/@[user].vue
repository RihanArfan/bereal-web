<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <h1 class="font-bold text-2xl">@{{ $route.params.user }}</h1>
    <p class="text-lg mt-1">Profiles coming soon</p>

    <NuxtLink to="/" class="mt-5">
      <UButton
        icon="i-heroicons-arrow-left-20-solid"
        size="lg"
        color="white"
        label="Go Home"
        :trailing="false"
      />
    </NuxtLink>
  </div>
</template>
