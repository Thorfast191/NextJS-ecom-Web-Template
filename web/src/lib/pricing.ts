export function getProductPrice(product: any) {
  const now = new Date();

  const hasDiscount = product.discountType && product.discountValue;

  const started =
    !product.discountStartAt || new Date(product.discountStartAt) <= now;

  const notExpired =
    !product.discountEndAt || new Date(product.discountEndAt) >= now;

  const isDiscountActive = hasDiscount && started && notExpired;

  if (!isDiscountActive) {
    return {
      originalPrice: product.price,

      finalPrice: product.price,

      isDiscounted: false,
    };
  }

  let finalPrice = product.price;

  // PERCENTAGE

  if (product.discountType === "PERCENTAGE") {
    finalPrice = product.price - product.price * (product.discountValue / 100);
  }

  // FIXED

  if (product.discountType === "FIXED") {
    finalPrice = product.price - product.discountValue;
  }

  return {
    originalPrice: product.price,

    finalPrice: Math.max(0, Math.round(finalPrice)),

    isDiscounted: true,
  };
}
