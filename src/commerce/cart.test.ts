import { test } from "node:test";
import { strict as assert } from "node:assert";
import { cartReducer } from "./cart.ts";
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
