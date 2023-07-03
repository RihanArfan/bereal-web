<template>
  <div class="flex flex-wrap">
    <aside class="z-40 w-96 lg:h-screen">
      <NavBar />

      <slot name="sidebar" />
    </aside>

    <main class="grow">
      <slot />
    </main>
  </div>
</template>
