<template>
  <div class="text-center">
    <img
      alt="BeReal logo"
      src="@/assets/text.png"
      class="mx-auto w-1/3 invert"
      width="800"
      height="181"
    />
    <p class="mt-5 text-2xl">Your Friends. For Real.</p>
  </div>

  <div
    class="container fixed bottom-0 right-0 left-0 mx-auto mb-5 max-w-lg px-2"
  >
    <RouterView />

    <ProjectDescription />
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(24 24 27) inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: white !important;
}

body {
  overflow: hidden;
}
</style>
