import type { CartLine } from "./types.ts";
export type CartAction =
  | { type: "add"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "clear" };
/** Pure reducer keeps cart behavior independent from the eventual provider. */
export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  if (action.type === "clear") return [];
  if (action.type === "remove")
    return state.filter((line) => line.variantId !== action.variantId);
  if (
    !Number.isInteger(action.quantity) ||
    action.quantity < 1 ||
    !action.variantId
  )
    return state;
  const existing = state.find((line) => line.variantId === action.variantId);
  return existing
    ? state.map((line) =>
        line.variantId === action.variantId
          ? { ...line, quantity: line.quantity + action.quantity }
          : line,
      )
    : [...state, { variantId: action.variantId, quantity: action.quantity }];
}
