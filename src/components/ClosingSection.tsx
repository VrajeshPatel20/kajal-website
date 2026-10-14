import { OceanAtmosphere } from "./OceanAtmosphere";
export function ClosingSection() {
  return (
    <section
      className="closing section reveal"
      id="contact"
      aria-labelledby="contact-title"
    >
      <OceanAtmosphere />
      <div className="section-kicker mono">
        <span>04 / CONTACT THE HOUSE</span>
        <span>NEW YORK / THE WORLD</span>
      </div>
      <h2 id="contact-title">
        The next chapter
        <br />
        starts <em>here.</em>
      </h2>
      <p className="contact-intro">
        For enquiries, collaborations, and conversations with Kesha Patel.
      </p>
      <a className="contact-email" href="mailto:keshapatel@gmail.com">
        keshapatel@gmail.com <span>↗</span>
      </a>
      <a className="closing-cta" href="#collection">
        Shop the collection <span>↗</span>
      </a>
    </section>
  );
}
