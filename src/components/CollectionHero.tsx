import { looks } from "../data/looks";
import { LookImage } from "./LookCard";
/** Full-length runway plates introduce the work before any long-form storytelling. */
export function CollectionHero({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  return (
    <section className="runway-hero" aria-labelledby="hero-title">
      <div className="runway-overline">
        <span>KAJAL — NEW YORK</span>
        <span>COLLECTION 001 / BY KESHA PATEL</span>
      </div>
      <h1 id="hero-title">
        OCEANS <span>ELEVEN</span>
        <sup>01</sup>
      </h1>
      <div className="runway-triptych">
        {[0, 2, 1].map((index, position) => (
          <button
            key={index}
            className={`runway-plate plate-${position}`}
            onClick={() => onOpen(index)}
            aria-label={`Explore ${looks[index].title}`}
          >
            <LookImage look={looks[index]} priority />
            <span className="plate-index">{looks[index].id}</span>
            <span className="plate-label">
              {looks[index].title}
              <span>↗</span>
            </span>
          </button>
        ))}
      </div>
      <div className="runway-bottom">
        <p>
          Extraordinary life.
          <br />
          Unexpected form.
        </p>
        <span>
          Inspired by the beings beneath the surface.
          <br />
          Designed to move in a world of your own.
        </span>
        <a href="#collection">
          Explore all looks <span>↓</span>
        </a>
      </div>
    </section>
  );
}
