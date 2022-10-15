export const useIsPwa = computed(
  () => window.matchMedia("(display-mode: standalone)").matches
);

export const useIsIos = computed(() => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad/.test(userAgent);
});

export const useIsNavSpacing = computed(() => useIsPwa.value && useIsIos.value);
