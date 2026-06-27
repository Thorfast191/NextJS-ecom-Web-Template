export function getProductStock(product: any) {
  if (!product?.variants?.length) return 0;

  return product.variants.reduce(
    (acc: number, variant: any) => acc + variant.stock,
    0,
  );
}

export function getDefaultVariant(product: any) {
  if (!product?.variants?.length) return null;

  return product.variants.find((v: any) => v.isActive) || product.variants[0];
}

export function getVariantLabel(variant: any) {
  const values = [variant?.size, variant?.color].filter(Boolean);

  return values.join(" / ");
}
