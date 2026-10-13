import { createContext, useContext, useReducer, type ReactNode } from "react";
import { cartReducer, type CartAction } from "./cart";
import type { CartLine, CommerceAdapter } from "./types";
const launchAdapter: CommerceAdapter = {
  async getProducts() {
    return [];
  },
  async createCheckout() {
    throw new Error("Commerce is not available during the brand launch.");
  },
};
const Context = createContext<{
  lines: CartLine[];
  dispatch: React.Dispatch<CartAction>;
  adapter: CommerceAdapter;
} | null>(null);
export function CommerceProvider({
  children,
  adapter = launchAdapter,
}: {
  children: ReactNode;
  adapter?: CommerceAdapter;
}) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  return (
    <Context.Provider value={{ lines, dispatch, adapter }}>
      {children}
    </Context.Provider>
  );
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error("useCart requires CommerceProvider");
  return value;
}
