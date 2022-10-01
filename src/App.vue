<template>
  <NavBar />

  <div
    class="mx-auto max-w-lg p-2"
    :class="{ 'mt-12': $route.name !== 'profile' }"
  >
    <RouterView />
  </div>
</template>
