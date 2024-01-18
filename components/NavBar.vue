<template>
  <div class="flex w-full items-center justify-between px-5 py-3">
    <slot name="left">
      <Icon name="heroicons:users-20-solid" color="white" class="h-5 w-5" />
    </slot>

    <img
      alt="BeReal Logo"
      src="/logo.svg"
      width="100"
      height="22.5"
      draggable="false"
    />

    <slot name="right">
      <Icon
        name="heroicons:ellipsis-vertical-20-solid"
        color="white"
        class="h-5 w-5"
      />
    </slot>
  </div>
</template>
