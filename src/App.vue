<template>
  <NavBar />

  <div
    class="max-w-lg mx-auto px-2 pb-2"
    :class="{ 'mt-14': $route.name !== 'profile' }"
  >
    <RouterView />
  </div>
</template>
