<template>
  <div class="flex flex-wrap">
    <aside class="z-40 h-screen w-96">
      <NavBar />

      <slot name="sidebar" />
    </aside>

    <main class="grow">
      <slot />
    </main>
  </div>
</template>
