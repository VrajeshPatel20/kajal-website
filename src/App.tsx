import { BrandLogo } from "./components/BrandLogo";
import { GalleryViewer } from "./components/GalleryViewer";
import { CollectionHero } from "./components/CollectionHero";
import { CollectionSection } from "./components/CollectionSection";
import { ClosingSection } from "./components/ClosingSection";
import { DesignerSection } from "./components/DesignerSection";
import { HouseSection } from "./components/HouseSection";
import { useEffect, useState } from "react";
import { looks } from "./data/looks";
import { formatPrice, getCatalogItem } from "./data/catalog";
import { useCart } from "./commerce/CommerceProvider";
import { CartDrawer } from "./components/CartDrawer";
import { UpcomingApparelSection } from "./components/UpcomingApparelSection";
import {
  createProductVariantId,
  productSizes,
  type ProductSize,
} from "./commerce/productVariant";

import { Modal } from "./components/Modal";

export default function App() {
  const [selected, setSelected] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedLookId, setAddedLookId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const { lines, dispatch } = useCart();
  const cartQuantity = lines.reduce((total, line) => total + line.quantity, 0);
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
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        setSelectedSize("M");
        setAddedLookId(null);
      }
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
        <a href="#" className="wordmark" aria-label="Kajal home">
          <BrandLogo />
        </a>
        <nav aria-label="Main navigation">
          <a href="#collection">The collection</a>
          <a href="#house">The house</a>
          <a href="#designer">The designer</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="cart-trigger"
          aria-label={`Open shopping bag, ${cartQuantity} items`}
          onClick={() => setCartOpen(true)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 8h14l-1 13H6L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
          <span>Bag</span>
          <span className="cart-count" aria-live="polite">
            {cartQuantity}
          </span>
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
        </nav>
      )}
      <main id="main">
        <CollectionHero
          onOpen={(index) => {
            setSelectedSize("M");
            setAddedLookId(null);
            setSelected(index);
          }}
        />
        <a className="announcement" href="#collection">
          <span className="mono">
            THE DEBUT COLLECTION
          </span>
          <span>Introducing Oceans Eleven.</span>
          <span className="mono">
            SHOP THE LOOKS <b>↗</b>
          </span>
        </a>
        <CollectionSection
          onOpen={(index) => {
            setSelectedSize("M");
            setAddedLookId(null);
            setSelected(index);
          }}
        />
        <UpcomingApparelSection />
        <HouseSection />
        <DesignerSection />
        <ClosingSection />
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
              <span className="look-detail-price">
                {formatPrice(getCatalogItem(looks[selected].id).amount)} USD
              </span>
              <p>{looks[selected].description}</p>
              <span className="mono">{looks[selected].category}</span>
              <div className="product-specs">
                <div>
                  <span className="mono">MATERIAL</span>
                  <span>100% cotton</span>
                </div>
                <div>
                  <span className="mono">ORIGIN</span>
                  <span>Made in India</span>
                </div>
              </div>
              <div className="size-picker">
                <span className="mono" id="size-label">
                  SELECT SIZE
                </span>
                <div role="group" aria-labelledby="size-label">
                  {productSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => {
                        setSelectedSize(size);
                        setAddedLookId(null);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="look-add-to-cart"
                onClick={() => {
                  const variantId = createProductVariantId(
                    looks[selected].id,
                    selectedSize,
                  );
                  dispatch({
                    type: "add",
                    variantId,
                    quantity: 1,
                  });
                  setAddedLookId(variantId);
                }}
              >
                {addedLookId ===
                createProductVariantId(looks[selected].id, selectedSize)
                  ? "Added to bag"
                  : "Add to bag"}
                <span>
                  {addedLookId ===
                  createProductVariantId(looks[selected].id, selectedSize)
                    ? "✓"
                    : "+"}
                </span>
              </button>
              <button
                className="look-buy-now"
                onClick={() => {
                  dispatch({
                    type: "add",
                    variantId: createProductVariantId(
                      looks[selected].id,
                      selectedSize,
                    ),
                    quantity: 1,
                  });
                  setSelected(null);
                  setCartOpen(true);
                  setAddedLookId(null);
                }}
              >
                Buy it now <span>↗</span>
              </button>
              {addedLookId ===
                createProductVariantId(looks[selected].id, selectedSize) && (
                <button
                  className="view-bag-link"
                  onClick={() => {
                    setSelected(null);
                    setCartOpen(true);
                    setAddedLookId(null);
                  }}
                >
                  View your bag ↗
                </button>
              )}
              <div className="detail-nav">
                <button
                  onClick={() => {
                    setSelectedSize("M");
                    setAddedLookId(null);
                    setSelected((selected + looks.length - 1) % looks.length);
                  }}
                >
                  ← Previous
                </button>
                <span className="mono">
                  {selected + 1} / {looks.length}
                </span>
                <button
                  onClick={() => {
                    setSelectedSize("M");
                    setAddedLookId(null);
                    setSelected((selected + 1) % looks.length);
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}
