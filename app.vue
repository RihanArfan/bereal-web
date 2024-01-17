<script setup lang="ts">
const isBrowser = useMediaQuery("(display-mode: browser)");

useHead({
  titleTemplate: (titleChunk) => {
    if (!isBrowser) return titleChunk ?? "BeReal"; // exclude if pwa
    return titleChunk ? `${titleChunk} | BeReal` : "BeReal";
  },
});

const isDark = usePreferredDark();
</script>

<template>
  <div>
    <Head>
      <Html class="dark" />

      <Link v-if="isDark" rel="icon" href="/icons/favicon-white.webp" />
      <Link v-else rel="icon" href="/icons/favicon.webp" />

      <!-- apple -->
      <Link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <Link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#000000"
      />

      <Meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Meta name="mobile-web-app-capable" content="yes" />

      <!-- twitter -->
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:site" content="@BeReal_App" />
      <Meta name="twitter:title" content="BeReal" />

      <!-- og -->
      <Meta property="og:title" content="BeReal" />
      <Meta property="og:type" content="website" />
      <Meta property="og:image" content="/icons/logo.png" />
      <Meta
        property="og:description"
        content="BeReal is an app where everyday at a different time, everyone is notified simultaneously to capture and share a photo in 2 minutes."
      />
    </Head>

    <Body class="bg-black text-white overscroll-none" />

    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster />
  </div>
</template>
