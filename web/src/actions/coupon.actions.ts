"use server";

import { prisma } from "@/lib/prisma";

// ========================
// VALIDATE COUPON
// ========================

export async function validateCoupon(code: string, subtotal: number) {
  // ========================
  // VALIDATION
  // ========================

  if (!code) {
    throw new Error("Coupon code is required");
  }

  if (subtotal <= 0) {
    throw new Error("Invalid cart subtotal");
  }

  // ========================
  // NORMALIZE
  // ========================

  const normalizedCode = code.trim().toUpperCase();

  // ========================
  // FIND COUPON
  // ========================

  const coupon = await prisma.coupon.findUnique({
    where: {
      code: normalizedCode,
    },
  });

  // ========================
  // NOT FOUND
  // ========================

  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  // ========================
  // INACTIVE
  // ========================

  if (!coupon.isActive) {
    throw new Error("Coupon is inactive");
  }

  // ========================
  // EXPIRED
  // ========================

  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
    throw new Error("Coupon expired");
  }

  // ========================
  // MINIMUM AMOUNT
  // ========================

  if (coupon.minAmount && subtotal < coupon.minAmount) {
    throw new Error(`Minimum order amount is ৳${coupon.minAmount}`);
  }

  // ========================
  // CALCULATE DISCOUNT
  // ========================

  let discount = 0;

  // PERCENTAGE

  if (coupon.type === "PERCENTAGE") {
    discount = (subtotal * coupon.value) / 100;
  }

  // FIXED

  if (coupon.type === "FIXED") {
    discount = coupon.value;
  }

  // ========================
  // SAFETY
  // ========================

  // NEVER EXCEED SUBTOTAL

  if (discount > subtotal) {
    discount = subtotal;
  }

  // NEVER NEGATIVE

  if (discount < 0) {
    discount = 0;
  }

  // ROUND

  discount = Number(discount.toFixed(2));

  // ========================
  // RETURN
  // ========================

  return {
    success: true,

    coupon: {
      id: coupon.id,

      code: coupon.code,

      type: coupon.type,

      value: coupon.value,
    },

    discount,
  };
}
