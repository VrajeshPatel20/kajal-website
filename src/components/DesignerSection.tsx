import { LookImage } from "./LookCard";
import { looks } from "../data/looks";
export function DesignerSection() {
  return (
    <section className="designer section reveal" id="designer">
      <div className="designer-image">
        <LookImage look={looks[1]} />
        <span className="mono">A STUDY IN MOVEMENT / KAJAL</span>
      </div>
      <div className="designer-copy">
        <span className="mono">03 / THE DESIGNER</span>
        <p className="hello">Hello, I’m</p>
        <h2>
          Kesha
          <br />
          <b>Patel.</b>
        </h2>
        <span className="mono designer-role">FOUNDER & DESIGNER</span>
        <p>
          Three months ago, I walked across the graduation stage, looked at a traditional career path, and said, "Nah, let's risk it all instead."
Welcome to Kajal—where traditional Indian textiles meet unapologetic Western silhouettes. I started this brand because our culture isn't just rich; it's inherently sexy, confident, and empowering. You shouldn't have to wait for a wedding or a festival to wear pieces that showcase South Asian artistry.
We source premium, ethical fabrics directly from India and cut them into modern designs that make you look and feel like the main character. It’s heritage, but makes it high-fashion. Designed for anyone ready to step into their power.
        </p>
        <a href="#collection" className="text-link">
          Discover the first chapter <span>↗</span>
        </a>
      </div>
    </section>
  );
}
