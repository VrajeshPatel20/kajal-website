import previews from "./previews.json";
/** Vite owns filenames and deployment paths, including hashed production assets.
 * Eager imports resolve URL strings only; they do not fetch the image bytes. */
const assets = import.meta.glob("../assets/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
export function lookAsset(image: string, width: 480 | 960 | 1440 | 1920) {
  const url = assets[`../assets/${image}-${width}.webp`];
  if (!url) throw new Error(`Missing build asset: ${image}-${width}.webp`);
  return url;
}
/** Tiny JPEG previews travel with application code, so an open page can always show the garment. */
export function lookPreview(image: string): string {
  return previews[image as keyof typeof previews];
}
