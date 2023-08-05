<template>
  <div class="flex text-zinc-900 dark:text-zinc-100 flex-col md:flex-row">
    <aside
      class="flex h-screen bg-neutral-100 dark:bg-neutral-900 md:w-1/3 md:min-w-[24rem] sticky top-0 flex h-screen"
    >
      <div
        class="py-2 px-2 md:pl-0 xl:max-w-2xl mx-auto lg:mx-0 lg:ml-auto flex flex-col w-full"
      >
        <NavBar />
      </div>
    </aside>

    <main class="max-w-xl px-3 pt-5 grow">
      <slot />
    </main>
  </div>
</template>
