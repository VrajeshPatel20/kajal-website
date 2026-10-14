import { useState } from "react";

const categories = [
  {
    name: "Tops",
    title: "Sculptural tops",
    note: "Expressive shapes, designed to stand on their own.",
  },
  {
    name: "Skirts",
    title: "Fluid skirts",
    note: "Movement-led silhouettes inspired by the tide.",
  },
  {
    name: "Dresses",
    title: "Occasion dresses",
    note: "New forms for evenings that call for something special.",
  },
  {
    name: "Sets",
    title: "Considered sets",
    note: "Distinct pieces, made to come together.",
  },
  {
    name: "Accessories",
    title: "Finishing pieces",
    note: "The final detail for a look entirely your own.",
  },
];

const filters = ["All pieces", ...categories.map((category) => category.name)];

export function UpcomingApparelSection() {
  const [filter, setFilter] = useState("All pieces");
  const visible =
    filter === "All pieces"
      ? categories
      : categories.filter((category) => category.name === filter);

  return (
    <section
      className="upcoming-apparel section"
      aria-labelledby="upcoming-apparel-title"
    >
      <div className="upcoming-heading">
        <div>
          <span className="mono">THE NEXT CHAPTER</span>
          <h2 id="upcoming-apparel-title">
            More to <em>come.</em>
          </h2>
        </div>
        <p>
          A growing wardrobe, shaped by the same ocean spirit.
          <br />
          Explore the categories joining the collection soon.
        </p>
      </div>
      <div className="upcoming-toolbar">
        <div
          className="upcoming-filters"
          role="group"
          aria-label="Filter upcoming clothing categories"
        >
          {filters.map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="mono upcoming-count" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "CATEGORY" : "CATEGORIES"}
        </span>
      </div>
      <div className="upcoming-grid">
        {visible.map((category) => (
          <article
            className={`upcoming-card upcoming-${category.name.toLowerCase()}`}
            key={category.name}
          >
            <div className="upcoming-art" aria-hidden="true">
              <span className="upcoming-art-number mono">
                {String(categories.indexOf(category) + 1).padStart(2, "0")}
              </span>
              <span className="upcoming-art-mark" />
              <span className="upcoming-art-caption mono">
                KAJAL / IN THE MAKING
              </span>
            </div>
            <div className="upcoming-card-copy">
              <span className="mono">{category.name.toUpperCase()}</span>
              <h3>{category.title}</h3>
              <p>{category.note}</p>
              <span className="upcoming-status">COMING SOON</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
