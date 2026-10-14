export const productSizes = ["S", "M", "L"] as const;
export type ProductSize = (typeof productSizes)[number];

export function createProductVariantId(lookId: string, size: ProductSize) {
  return `${lookId}:${size}`;
}

function isProductSize(value: string): value is ProductSize {
  return productSizes.some((size) => size === value);
}

export function parseProductVariantId(variantId: string) {
  const separator = variantId.lastIndexOf(":");
  const lookId = variantId.slice(0, separator);
  const size = variantId.slice(separator + 1);
  if (separator < 1 || !isProductSize(size))
    throw new Error(`Invalid product variant: ${variantId}`);
  return { lookId, size };
}
