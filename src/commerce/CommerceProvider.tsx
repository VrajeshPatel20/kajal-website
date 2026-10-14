import { createContext, useContext, useReducer, type ReactNode } from "react";
import { cartReducer, type CartAction } from "./cart";
import type { CartLine } from "./types";
const Context = createContext<{
  lines: CartLine[];
  dispatch: React.Dispatch<CartAction>;
} | null>(null);
export function CommerceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  return (
    <Context.Provider value={{ lines, dispatch }}>
      {children}
    </Context.Provider>
  );
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error("useCart requires CommerceProvider");
  return value;
}
