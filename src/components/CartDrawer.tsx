import { useCart } from "../commerce/CommerceProvider";
import { formatPrice, getCatalogItem } from "../data/catalog";
import { looks } from "../data/looks";
import { parseProductVariantId } from "../commerce/productVariant";
import { LookImage } from "./LookCard";
import { Modal } from "./Modal";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines, dispatch } = useCart();
  const quantity = lines.reduce((total, line) => total + line.quantity, 0);
  const total = lines.reduce(
    (sum, line) => sum + getCatalogItem(line.variantId).amount * line.quantity,
    0,
  );

  return (
    <Modal label="Your shopping bag" onClose={onClose}>
      <div className="cart-content">
        <span className="mono cart-kicker">
          YOUR BAG / {String(quantity).padStart(2, "0")}{" "}
          {quantity === 1 ? "ITEM" : "ITEMS"}
        </span>
        <h2>Your selection</h2>
        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is waiting for something special.</p>
            <a href="#collection" className="cart-continue" onClick={onClose}>
              Explore the collection <span>↗</span>
            </a>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => {
                const { lookId, size } = parseProductVariantId(line.variantId);
                const look = looks.find((item) => item.id === lookId);
                if (!look) throw new Error(`Unknown cart item: ${line.variantId}`);
                const item = getCatalogItem(look.id);
                return (
                  <article className="cart-line" key={line.variantId}>
                    <div className="cart-line-image">
                      <LookImage look={look} />
                    </div>
                    <div className="cart-line-copy">
                      <span className="mono">{look.category}</span>
                      <h3>{look.title}</h3>
                      <span className="cart-line-size">Size: {size}</span>
                      <span>{formatPrice(item.amount)} USD</span>
                      <div className="cart-line-controls">
                        <div
                          className="quantity-control"
                          role="group"
                          aria-label={`Quantity for ${look.title}`}
                        >
                          <button
                            aria-label={`Decrease ${look.title} quantity`}
                            onClick={() =>
                              line.quantity === 1
                                ? dispatch({
                                    type: "remove",
                                    variantId: line.variantId,
                                  })
                                : dispatch({
                                    type: "set-quantity",
                                    variantId: line.variantId,
                                    quantity: line.quantity - 1,
                                  })
                            }
                          >
                            −
                          </button>
                          <span aria-live="polite">{line.quantity}</span>
                          <button
                            aria-label={`Increase ${look.title} quantity`}
                            onClick={() =>
                              dispatch({
                                type: "add",
                                variantId: line.variantId,
                                quantity: 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-remove"
                          onClick={() =>
                            dispatch({
                              type: "remove",
                              variantId: line.variantId,
                            })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <strong>{formatPrice(item.amount * line.quantity)}</strong>
                  </article>
                );
              })}
            </div>
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{formatPrice(total)} USD</strong>
            </div>
            <p className="cart-shipping-note">
              Live U.S. shipping rates have not been configured yet.
            </p>
            <button
              className="cart-checkout"
              disabled
              aria-describedby="checkout-unavailable"
            >
              Checkout unavailable
            </button>
            <p className="cart-secure-note" id="checkout-unavailable">
              Stripe checkout will open when live shipping is ready.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
