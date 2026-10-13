import { useState } from "react";
import { lookAsset, lookPreview } from "../data/assets";
import type { Look } from "../commerce/types";
export function LookImage({
  look,
  priority = false,
}: {
  look: Look;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? lookPreview(look.image) : lookAsset(look.image, 960)}
      onError={() => setFailed(true)}
      srcSet={
        failed
          ? undefined
          : `${lookAsset(look.image, 480)} 480w, ${lookAsset(look.image, 960)} 960w, ${lookAsset(look.image, 1440)} 1440w`
      }
      sizes={
        priority
          ? "(max-width: 700px) 100vw, 50vw"
          : "(max-width: 700px) 85vw, 40vw"
      }
      width="960"
      height="1440"
      alt={look.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function LookCard({
  look,
  total,
  onOpen,
}: {
  look: Look;
  total: number;
  onOpen: (look: Look) => void;
}) {
  return (
    <button
      className="look-card"
      onClick={() => onOpen(look)}
      aria-label={`Explore look ${look.id}: ${look.title}`}
    >
      <div className="look-photo">
        <LookImage look={look} />
        <span className="photo-cta">Explore look ↗</span>
      </div>
      <div className="look-caption">
        <span>{look.title}</span>
        <span className="mono">
          {look.id} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <span className="look-category mono">{look.category}</span>
      <p className="look-story">{look.description}</p>
    </button>
  );
}
