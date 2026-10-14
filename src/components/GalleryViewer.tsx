import { useEffect, useRef, useState } from "react";
import type { Look } from "../commerce/types";
import { lookAsset, lookOriginal, lookPreview } from "../data/assets";

/** Mounted only for an open look: high-resolution bytes never enter the initial page load. */
export function GalleryViewer({ look }: { look: Look }) {
  const [source, setSource] = useState(() => lookAsset(look.image, 1440));
  const [quality, setQuality] = useState<"loading" | "ready" | "preview">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const [zoom, setZoom] = useState(1);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  useEffect(() => {
    let active = true;
    let pending: HTMLImageElement | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Load one candidate at a time, preserving the bundled preview throughout.
    async function load() {
      setQuality("loading");
      const candidates = [
        { url: lookOriginal(look.image), quality: "ready" as const },
        { url: lookAsset(look.image, 1920), quality: "ready" as const },
        { url: lookAsset(look.image, 1440), quality: "preview" as const },
        { url: lookAsset(look.image, 960), quality: "preview" as const },
        { url: lookAsset(look.image, 480), quality: "preview" as const },
      ];
      for (const candidate of candidates) {
        const base = candidate.url;
        const url = attempt ? `${base}?retry=${attempt}` : base;
        const ok = await new Promise<boolean>((resolve) => {
          const image = new Image();
          pending = image;
          const finish = (success: boolean) => {
            clearTimeout(timer);
            image.onload = null;
            image.onerror = null;
            resolve(success);
          };
          image.onload = () => finish(true);
          image.onerror = () => finish(false);
          timer = setTimeout(() => finish(false), 6000);
          image.src = url;
        });
        if (!active) return;
        if (ok) {
          setSource(url);
          setQuality(candidate.quality);
          return;
        }
      }
      if (active) {
        setSource(lookPreview(look.image));
        setQuality("preview");
      }
    }
    void load();
    return () => {
      active = false;
      clearTimeout(timer);
      if (pending) {
        pending.onload = null;
        pending.onerror = null;
      }
    };
  }, [look.image, attempt]);
  function changeZoom(next: number) {
    setZoom(next);
    stage.current?.focus({ preventScroll: true });
    if (next === 1) {
      stage.current?.scrollTo({ left: 0, top: 0, behavior: "auto" });
      return;
    }
    requestAnimationFrame(() => {
      const element = stage.current;
      if (!element) return;
      element.scrollTo({
        left: (element.scrollWidth - element.clientWidth) / 2,
        top: 0,
        behavior: "auto",
      });
    });
  }
  return (
    <div className="gallery-viewer">
      <div
        ref={stage}
        className={`zoom-stage ${zoom > 1 ? "is-zoomed" : ""}`}
        tabIndex={0}
        role="region"
        aria-label="Runway image. When zoomed, drag or use arrow keys to pan."
        onKeyDown={(e) => {
          if (zoom > 1 && e.key.startsWith("Arrow")) {
            e.stopPropagation();
            e.preventDefault();
            const steps: Record<string, [number, number]> = {
              ArrowLeft: [-80, 0],
              ArrowRight: [80, 0],
              ArrowUp: [0, -80],
              ArrowDown: [0, 80],
            };
            const step = steps[e.key];
            if (step)
              e.currentTarget.scrollBy({
                left: step[0],
                top: step[1],
                behavior: "auto",
              });
          }
        }}
        onPointerDown={(e) => {
          if (zoom === 1 || e.pointerType === "touch") return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            left: e.currentTarget.scrollLeft,
            top: e.currentTarget.scrollTop,
          };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          e.currentTarget.scrollLeft =
            drag.current.left + drag.current.x - e.clientX;
          e.currentTarget.scrollTop =
            drag.current.top + drag.current.y - e.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div
          className="zoom-surface"
          style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
        >
          <img
            src={source}
            width="1920"
            height="2880"
            alt={look.alt}
            draggable={false}
            decoding="async"
            onError={() => {
              setSource(lookAsset(look.image, 1440));
              setQuality("preview");
            }}
          />
        </div>
      </div>
      <div className="viewer-toolbar">
        <button
          disabled={zoom === 1}
          onClick={() => changeZoom(1)}
          aria-label="Reset image zoom"
        >
          −
        </button>
        <span className="mono">{zoom === 1 ? "FIT" : "200%"}</span>
        <button
          disabled={zoom === 2}
          onClick={() => changeZoom(2)}
          aria-label="Zoom into image"
        >
          +
        </button>
        <span className="viewer-hint">
          {zoom === 2 ? "Drag to explore" : "A closer look"}
        </span>
      </div>
      <div className="viewer-status" role="status" aria-live="polite">
        {quality === "loading" ? (
          "Refining image…"
        ) : quality === "preview" ? (
          <>
            <span>Preview shown. Full detail is temporarily offline.</span>
            <button
              onClick={() => {
                setAttempt((a) => a + 1);
                stage.current?.focus({ preventScroll: true });
              }}
            >
              Reload detail
            </button>
          </>
        ) : (
          "Full resolution"
        )}
      </div>
    </div>
  );
}
