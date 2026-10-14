import catalog from "./catalog.json";

export const catalogItems = catalog.items;

export function getCatalogItem(id: string) {
  const item = catalogItems.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown collection item: ${id}`);
  return item;
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: catalog.currency,
  }).format(amount / 100);
}
