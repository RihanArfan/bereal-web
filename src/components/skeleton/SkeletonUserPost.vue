<template>
  <div>
    <SkeletonUserPostHeader />

    <div class="relative animate-pulse">
      <img
        class="rounded-xl bg-slate-200"
        :width="1500"
        :height="2000"
        alt=""
      />

      <!-- Disabled as lack of src causes non-removable border and 1x1 base64 gif creates square -->
      <!-- <img
        class="rounded-xl mt-3 ml-3 absolute top-0 left-0 w-1/4 bg-slate-300 border-slate-300"
        :width="1500"
        :height="2000"
        alt=""
      /> -->
    </div>

    <div class="mt-3 mb-1 animate-pulse">
      <div class="h-4 w-1/3 rounded bg-slate-200 sm:w-1/4"></div>
    </div>
  </div>
</template>
