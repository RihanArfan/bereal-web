<template>
  <NavBar />

  <div
    class="mx-auto max-w-lg px-2 pb-2"
    :class="{ 'mt-14': $route.name !== 'profile' }"
  >
    <RouterView />
  </div>
</template>
