import { useState } from "react";
import { lookAsset, lookPreview } from "../data/assets";
import type { Look } from "../commerce/types";
import { formatPrice, getCatalogItem } from "../data/catalog";
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
  onAdd,
}: {
  look: Look;
  total: number;
  onOpen: (look: Look) => void;
  onAdd: (id: string) => void;
}) {
  return (
    <article className="look-card">
      <button
        className="look-card-open"
        onClick={() => onOpen(look)}
        aria-label={`Explore look ${look.id}: ${look.title}`}
      >
        <div className="look-photo">
          <LookImage look={look} />
          <span className="photo-cta">View details ↗</span>
        </div>
      </button>
      <div className="look-caption">
        <span>{look.title}</span>
        <span className="look-price">{formatPrice(getCatalogItem(look.id).amount)} USD</span>
      </div>
      <div className="look-card-meta">
        <span className="look-category mono">{look.category}</span>
        <span className="mono">
          LOOK {look.id} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <p className="look-story">{look.description}</p>
      <button className="card-add-to-cart" onClick={() => onAdd(look.id)}>
        Add to bag <span>+</span>
      </button>
    </article>
  );
}
