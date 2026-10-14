import { test } from "node:test";
import { strict as assert } from "node:assert";
import { cartReducer } from "./cart.ts";
import {
  createProductVariantId,
  parseProductVariantId,
} from "./productVariant.ts";
test("merges matching variants while preserving other variants", () => {
  const initial = [
    { variantId: "a", quantity: 2 },
    { variantId: "b", quantity: 1 },
  ];
  assert.deepEqual(
    cartReducer(initial, { type: "add", variantId: "a", quantity: 3 }),
    [
      { variantId: "a", quantity: 5 },
      { variantId: "b", quantity: 1 },
    ],
  );
  assert.equal(initial[0].quantity, 2);
});
test("rejects invalid quantities and empty variant identifiers", () => {
  for (const quantity of [-1, 0, 1.5, NaN, Infinity])
    assert.deepEqual(
      cartReducer([], { type: "add", variantId: "a", quantity }),
      [],
    );
  assert.deepEqual(
    cartReducer([], { type: "add", variantId: "", quantity: 1 }),
    [],
  );
});
test("removes a variant and clears the cart", () => {
  const initial = [
    { variantId: "a", quantity: 1 },
    { variantId: "b", quantity: 2 },
  ];
  assert.deepEqual(cartReducer(initial, { type: "remove", variantId: "a" }), [
    { variantId: "b", quantity: 2 },
  ]);
  assert.deepEqual(cartReducer(initial, { type: "clear" }), []);
});

test("sets a cart quantity or removes the item at zero", () => {
  const initial = [{ variantId: "a", quantity: 3 }];
  assert.deepEqual(
    cartReducer(initial, {
      type: "set-quantity",
      variantId: "a",
      quantity: 2,
    }),
    [{ variantId: "a", quantity: 2 }],
  );
  assert.deepEqual(
    cartReducer(initial, {
      type: "set-quantity",
      variantId: "a",
      quantity: 0,
    }),
    [],
  );
});

test("keeps garment sizes as separate cart variants", () => {
  const smallId = createProductVariantId("01", "S");
  const largeId = createProductVariantId("01", "L");
  const cart = cartReducer(
    [{ variantId: smallId, quantity: 1 }],
    { type: "add", variantId: largeId, quantity: 1 },
  );
  assert.deepEqual(cart, [
    { variantId: smallId, quantity: 1 },
    { variantId: largeId, quantity: 1 },
  ]);
  assert.deepEqual(parseProductVariantId(largeId), {
    lookId: "01",
    size: "L",
  });
  assert.throws(() => parseProductVariantId("01:XL"), /Invalid product variant/);
});
