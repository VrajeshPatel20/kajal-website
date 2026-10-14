import designerImage from "../../images/myimage.jpeg";
export function DesignerSection() {
  return (
    <section className="designer section reveal" id="designer">
      <div className="designer-image">
        <img
          src={designerImage}
          width="786"
          height="1092"
          alt="Kesha Patel wearing a yellow dress against a dark stone wall"
          loading="lazy"
          decoding="async"
        />
        <span className="mono">KESHA PATEL / FOUNDER & DESIGNER</span>
      </div>
      <div className="designer-copy">
        <span className="mono">03 / THE DESIGNER</span>
        <p className="hello">Hello, I’m</p>
        <h2>
          Kesha
          <br />
          <em>Patel.</em>
        </h2>
        <span className="mono designer-role">FOUNDER & DESIGNER</span>
        <p>
          Kajal begins with a personal point of view. Founded by Kesha Patel and
          based in New York, the house draws its core inspiration from the
          beings of the ocean: their iridescence, strange beauty, and
          instinctive movement. Their forms become a starting point for
          expressive silhouettes, imagined through a New York lens.
        </p>
        <a href="#collection" className="text-link">
          Discover the first chapter <span>↗</span>
        </a>
      </div>
    </section>
  );
}
