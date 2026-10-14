import previews from "./previews.json";
/** Vite owns filenames and deployment paths, including hashed production assets.
 * Eager imports resolve URL strings only; they do not fetch the image bytes. */
const assets = import.meta.glob("../assets/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const originals = import.meta.glob("../../images/WhatsApp Image*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const originalByLook: Record<string, string> = {
  "look-01": "../../images/WhatsApp Image 2026-10-13 at 15.29.34 (2).jpeg",
  "look-02": "../../images/WhatsApp Image 2026-10-13 at 15.29.34 (1).jpeg",
  "look-03": "../../images/WhatsApp Image 2026-10-13 at 15.29.35.jpeg",
  "look-04": "../../images/WhatsApp Image 2026-10-13 at 15.29.35 (1).jpeg",
  "look-05": "../../images/WhatsApp Image 2026-10-13 at 15.29.34.jpeg",
};
export function lookAsset(image: string, width: 480 | 960 | 1440 | 1920) {
  const url = assets[`../assets/${image}-${width}.webp`];
  if (!url) throw new Error(`Missing build asset: ${image}-${width}.webp`);
  return url;
}
/** Full-size supplied photos are loaded only when a look is opened. */
export function lookOriginal(image: string): string {
  const path = originalByLook[image];
  const url = path ? originals[path] : undefined;
  if (!url) throw new Error(`Missing original image for ${image}`);
  return url;
}
/** Tiny JPEG previews travel with application code, so an open page can always show the garment. */
export function lookPreview(image: string): string {
  return previews[image as keyof typeof previews];
}
