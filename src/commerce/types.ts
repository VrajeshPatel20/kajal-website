/** Commerce contracts. Monetary amounts use integer minor units. */
export interface Money {
  amount: number;
  currency: string;
}
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  variants: ProductVariant[];
}
export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  available: boolean;
}
export interface CartLine {
  variantId: string;
  quantity: number;
}
/** Editorial looks intentionally do not imply purchasable inventory. */
export interface Look {
  silhouette: "Gowns" | "Separates";
  id: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  image: string;
  productId?: string;
}
