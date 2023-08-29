export function useCdnImage(src: string) {
  const value = unref(src);
  const srcWithoutPrefix = value.replace("https://cdn.bereal.network", "");
  return srcWithoutPrefix;
}
