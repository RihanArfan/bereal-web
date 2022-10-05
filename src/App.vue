<template>
  <NavBar />

  <div
    class="mx-auto max-w-lg px-2 pb-2 sm:px-0"
    :class="{ 'mt-12': $route.name !== 'profile' }"
  >
    <RouterView />
  </div>
</template>
