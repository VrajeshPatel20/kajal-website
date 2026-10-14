import { useState } from "react";
import { looks } from "../data/looks";
import { LookCard } from "./LookCard";
/** Filters operate on editorial metadata and remain independent of a commerce provider. */
export function CollectionSection({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  const [filter, setFilter] = useState("All looks");
  const visible = looks.filter(
    (look) => filter === "All looks" || look.silhouette === filter,
  );
  return (
    <section
      className="collection section"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="library-heading">
        <div>
          <span className="mono">THE COLLECTION</span>
          <h2 id="collection-title">Oceans Eleven</h2>
        </div>
        <p>
          Ocean life, imagined in form.
          <br />
          Discover the story behind each look.
        </p>
      </div>
      <div className="library-toolbar">
        <div
          className="library-filters"
          role="group"
          aria-label="Filter looks by silhouette"
        >
          {["All looks", "Gowns", "Separates"].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="library-count mono" role="status">
          {visible.length} {visible.length === 1 ? "LOOK" : "LOOKS"}
        </span>
      </div>
      <div className="collection-grid">
        {visible.map((look) => (
          <LookCard
            key={look.id}
            look={look}
            total={looks.length}
            onOpen={() =>
              onOpen(looks.findIndex((item) => item.id === look.id))
            }
          />
        ))}
      </div>
      <div className="collection-foot mono">
        <span>OCEANS ELEVEN / BY KESHA PATEL</span>
        <span>A STUDY IN OCEAN LIFE</span>
      </div>
    </section>
  );
}
