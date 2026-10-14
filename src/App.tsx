import { BrandLogo } from "./components/BrandLogo";
import { GalleryViewer } from "./components/GalleryViewer";
import { CollectionHero } from "./components/CollectionHero";
import { CollectionSection } from "./components/CollectionSection";
import { ClosingSection } from "./components/ClosingSection";
import { DesignerSection } from "./components/DesignerSection";
import { HouseSection } from "./components/HouseSection";
import { useEffect, useState } from "react";
import { looks } from "./data/looks";

import { Modal } from "./components/Modal";

export default function App() {
  const [launch, setLaunch] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  // IntersectionObserver reveals avoid a scroll-event render loop; reduced motion stays static.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (selected === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setSelected((i) => ((i ?? 0) + 1) % looks.length);
      if (e.key === "ArrowLeft")
        setSelected((i) => ((i ?? 0) + looks.length - 1) % looks.length);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#" className="wordmark" aria-label="Kajal home" style={{ fontSize: '15px' }}>
          <BrandLogo />
        </a>
        <nav aria-label="Main navigation">
          <a href="#collection" style={{ fontSize: '15px' }}>The collection</a>
          <a href="#house" style={{ fontSize: '15px' }}>The house</a>
          <a href="#designer" style={{ fontSize: '15px' }}>The designer</a>
          <a href="#contact" style={{ fontSize: '15px' }}>Contact</a>
        </nav>
        <button className="launch-link" onClick={() => setLaunch(true)}>
          <i /> Open for business <span>↗</span>
        </button>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="mobile-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
      </header>
      {menu && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ["collection", "The collection"],
            ["house", "The house"],
            ["designer", "The designer"],
            ["contact", "Contact"],
          ].map(([id, title]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {title} ↗
            </a>
          ))}
          <button style={{ fontSize: '20px'}}
            onClick={() => {
              setMenu(false);
              setLaunch(true);
            }}
          >
            Open for business ↗
          </button>
        </nav>
      )}
      <main id="main">
        <CollectionHero onOpen={setSelected} />
        <button className="announcement" onClick={() => setLaunch(true)}>
          <span className="mono">
            <i /> THE HOUSE IS OPEN
          </span>
          <span>Introducing Oceans Eleven.</span>
          <span className="mono">
            MEET KAJAL <b>↗</b>
          </span>
        </button>
        <CollectionSection onOpen={setSelected} />
        <HouseSection />
        <DesignerSection />
        <ClosingSection onOpen={() => setLaunch(true)} />
      </main>
      <footer>
        <div className="footer-top">
          <a href="#" className="footer-logo" aria-label="Kajal, back to top">
            <BrandLogo />
          </a>
          <span>
            A NEW YORK FASHION HOUSE
            <br />
            BY KESHA PATEL
            <a className="footer-email" href="mailto:keshapatel@gmail.com">
              keshapatel@gmail.com
            </a>
          </span>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} KAJAL</span>
          <span>INDEPENDENT SPIRIT. DISTINCT EXPRESSION.</span>
          <a href="#">BACK TO TOP ↑</a>
        </div>
      </footer>
      {launch && (
        <Modal
          label="Kajal launch announcement"
          onClose={() => setLaunch(false)}
        >
          <div className="launch-content">
            <span className="mono">
              <i /> NEW YORK — NOW OPEN
            </span>
            <h2>
              The house
              <br />
              is <em>open.</em>
            </h2>
            <p>
              Introducing Kajal, a New York fashion house by Kesha Patel. Our
              debut collection, Oceans Eleven, is here. Explore the runway and
              discover a new point of view.
            </p>
            <p className="launch-note">
              The debut edit is presented as a lookbook. Online shopping is
              coming in a future chapter.
            </p>
            <a
              className="solid-link"
              href="#collection"
              onClick={() => setLaunch(false)}
            >
              Explore Oceans Eleven <span>↗</span>
            </a>
          </div>
        </Modal>
      )}
      {selected !== null && (
        <Modal
          label={`Look ${looks[selected].id}: ${looks[selected].title}`}
          onClose={() => setSelected(null)}
        >
          <div className="look-detail">
            <GalleryViewer key={looks[selected].id} look={looks[selected]} />
            <div className="look-detail-copy">
              <span className="mono">OCEANS ELEVEN / {looks[selected].id}</span>
              <h2>{looks[selected].title}</h2>
              <p>{looks[selected].description}</p>
              <span className="mono">{looks[selected].category}</span>
              <div className="detail-nav">
                <button
                  onClick={() =>
                    setSelected((selected + looks.length - 1) % looks.length)
                  }
                >
                  ← Previous
                </button>
                <span className="mono">
                  {selected + 1} / {looks.length}
                </span>
                <button
                  onClick={() => setSelected((selected + 1) % looks.length)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
