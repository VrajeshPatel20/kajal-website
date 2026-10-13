# KAJAL — a New York fashion house

A local React 19 + TypeScript + Vite brand flagship for Kesha Patel, built from the five supplied runway photographs. Warm ivory, soft stone, and dark neutral typography create a calm collection library for Oceans Eleven.

## Run

On this machine, dependencies are installed. Run:

```sh
cd /Users/vrajeshpatel/Desktop/projects/kajal-website
./run-local.sh
```

Open the URL printed in the terminal. For a fresh environment, install Node.js 22+ and pnpm, then run `pnpm install`, `pnpm dev`. Production: `pnpm build`; inspect: `pnpm preview`; tests: `pnpm test`. The lockfile records exact dependency versions. The package installer reported an unapproved optional esbuild install script; the platform binary successfully built the project without running that script.

## Source manifest

- `index.html` — document metadata, font preloads and React entry.
- `src/main.tsx` — application root and commerce provider.
- `src/App.tsx` — landing composition, anchor navigation, gallery and dialog state.
- `src/styles.css` — shared layout, motion and interaction primitives.
- `src/art-direction.css` — current ivory/stone collection-library design and responsive grid.
- `src/components/CollectionHero.tsx` — Oceans Eleven introduction and paired runway images.
- `src/components/CollectionSection.tsx` — responsive library and silhouette filters.
- `src/components/HouseSection.tsx` — brand statement.
- `src/components/DesignerSection.tsx` — designer introduction.
- `src/components/ClosingSection.tsx` — closing launch invitation.
- `src/components/LookCard.tsx` — reusable editorial card and responsive image.
- `src/components/Modal.tsx` — native dialog, focus restoration and body scroll lock.
- `src/data/looks.ts` — typed editorial copy and photography references.
- `src/commerce/types.ts` — product, variant, money, look, cart and adapter interfaces.
- `src/commerce/CommerceProvider.tsx` — injected commerce adapter and `useCart` hook.
- `src/commerce/cart.ts` — pure cart reducer.
- `src/commerce/cart.test.ts` — cart merge, invalid quantity, removal and clear tests.
- `images/` — untouched user-supplied originals.
- `public/images/` — 480px, 960px, 1440px and on-demand 1920px WebP derivatives.
- `public/fonts/` — self-hosted fonts and OFL licenses.
- `public/favicon.svg`, `public/cursor.svg` — brand browser assets.
- `run-local.sh` — local startup with a bundled-runtime fallback.
- `REVIEW.md` — peer review and verification record.
- `dist/` — verified static production build.

## Commerce integration

Editorial `Look` data is independent of `Product`, with an optional `productId` association. The launch does not present runway garments as stock or invent prices. `CommerceProvider` accepts a `CommerceAdapter`; implement `getProducts()` and `createCheckout()` with Shopify Storefront or Medusa, then inject the adapter at the root. Existing story sections and gallery rendering remain independent of the chosen provider.

The cart uses provider-neutral variant IDs and integer quantities. Prices use integer minor units with currency. A real integration still needs inventory validation, persistence, provider error handling, product selection UI, server-side secret management where needed, and checkout integration tests. The adapter boundary minimizes refactoring; it is not a complete commerce backend. Never put private API credentials in Vite client environment variables.

## Experience and content

The single-page routes are `#collection`, `#house`, `#designer` and `#contact`; navigation preserves browser history and deep links. A gallery dialog supports next/previous controls and arrow keys. Native modal dialogs support Escape and focus containment. The mobile menu, reduced-motion mode, visible focus rings, skip link and descriptive image alternatives are implemented. The designer section interprets the brief's “ABC Hello” as a personal “Hello, I’m Kesha Patel” introduction.

Launch copy is editorial draft copy. Biographical details and ocean inspiration follow the supplied brief. The official contact is keshapatel@gmail.com, displayed as a mailto link in the contact section and footer. No studio address, social account or commerce availability was invented. Original photography remains in `images`; confirm publication rights before a public deployment. No public deployment was performed.

## Performance and validation boundaries

Images reserve dimensions, use responsive sources and defer offscreen loading. Fonts are local and use `font-display: optional` to avoid late font swaps. Scroll reveals use IntersectionObserver; reduced-motion mode removes animation. The custom cursor is restricted to image interactions on fine pointers. The site uses a continuous editorial document, so there are no artificial asynchronous page loads; dialog transitions supply the requested transition polish.

TypeScript and Vite production build pass. Three cart tests pass. The production browser check verified desktop rendering, mobile rendering at 390px, no mobile horizontal overflow, menu navigation, dialog opening, Escape dismissal, and next-look navigation. See REVIEW.md. Full WCAG AA conformance, zero CLS, sub-second delivery and deployed Core Web Vitals are not certified. Those require a dedicated accessibility audit and measurement on actual hosting and network conditions.

## Ocean edition and image recovery

`OceanAtmosphere.tsx` adds subtle composited light fields and wave contours with local pause controls and reduced-motion support. This uses CSS/SVG rather than a continuously rendering WebGL shader to keep the page light. `GalleryViewer.tsx` owns high-resolution image loading, retry, fit/200% zoom, pointer dragging, touch scrolling and keyboard panning. It is separate from commerce and editorial data.

`data/assets.ts` resolves all look URLs against Vite's deployment base. Originals with spaces/parentheses remain untouched in `images/`; browser assets have stable filenames in `public/images/`, copied into `dist/images/` by Vite. No filesystem path or runtime dynamic import is required. Pass `--base=/your-path/` to Vite when deploying below a subdirectory.

The viewer mounts on demand and fetches the 1920px image only when opened. A 960px preview remains visible while loading; failed previews fall back to 480px, and complete failure shows a descriptive, retryable state. Changing looks remounts image state and ignores stale load callbacks. The initial reported popup exception was not reproduced on the current healthy asset set; the previously unhandled failure paths and root-relative look URLs have been replaced and tested under deliberate HTTP failures.

## Current direction — Oceans Eleven

The latest design replaces the dramatic photograph-derived palette with warm ivory and stone chosen for comfortable browsing. The collection precedes the brand story. Desktop displays three columns and mobile two; All looks, Gowns and Separates filters act on typed editorial metadata. Five supplied looks are shown; the name Oceans Eleven does not imply that eleven images are available.

Nishorama Global (https://row.nishorama.com/) was reviewed for broad UX principles: direct collection access, clear categories and consistent product cards. No reference artwork, copy, code or branded visual assets were copied. Kajal retains an original serif identity, paired-image introduction, neutral library and its own ocean-life narratives.

Ocean-inspired look descriptions are editorial interpretations written for the brief. Their titles and creature associations can be edited in src/data/looks.ts. Lightbox zoom, fallback/retry, contact links and provider-neutral commerce state remain available.

## Latest revision — garment-first runway and supplied logo

The current design uses Manrope, large full-length runway plates, two-column desktop collection images and one full-width look per row on mobile. The lightbox allocates the majority of desktop space to the garment, with a compact supporting copy column; on mobile the image occupies most of the first screen.

`BrandLogo.tsx` renders the supplied `images/mylogo.jpeg`, imported as a build asset. The file contains editor chrome, so a CSS viewport isolates the artwork and a display filter removes the paper cast. The original file is unchanged. Header and footer both use this component.

The asset resolver now uses Vite imports from `src/assets`, producing fingerprinted image URLs. Small JPEG previews in `src/data/previews.json` travel with application code and remain available to an already-loaded page even if every subsequent image request fails. The viewer loads 1920px, then 960px, then 480px images sequentially, preserving the embedded preview. Reload detail retries with a fresh URL. This supersedes the earlier public-path resolver and terminal unavailable panel.

The browser must still have a running server to load the application initially. Leave `./run-local.sh` running during review. The user-facing production preview is kept running for this handover; only the isolated failure-test server was stopped.
