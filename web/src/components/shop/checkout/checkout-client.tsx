"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cart-store";

import { createOrder } from "@/actions/order.actions";

import { validateCoupon } from "@/actions/coupon.actions";

import { getAnalyticsSession } from "@/lib/analytics";
import { trackEvent } from "@/actions/analytics.actions";

import CheckoutForm from "./checkout-form";
import CheckoutSummary from "./checkout-summary";
import SuccessModal from "./success-modal";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string | null;
  isPickup: boolean;
}

interface Props {
  shippingMethods: ShippingMethod[];
}

export default function CheckoutClient({ shippingMethods }: Props) {
  const router = useRouter();

  // ========================
  // CART STORE
  // ========================

  const items = useCartStore((state) => state.items);

  const totalPrice = useCartStore((state) => state.totalPrice);

  const clearCart = useCartStore((state) => state.clearCart);

  // ========================
  // HYDRATION
  // ========================

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    trackEvent({
      sessionId: getAnalyticsSession(),
      event: "BEGIN_CHECKOUT",
      path: "/checkout",
    });
  }, [mounted]);

  // ========================
  // FORM STATE
  // ========================

  const [loading, setLoading] = useState(false);

  const [successOrderId, setSuccessOrderId] = useState("");

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [selectedShippingId, setSelectedShippingId] = useState(
    shippingMethods?.[0]?.id || "",
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [couponCode, setCouponCode] = useState("");

  const [discount, setDiscount] = useState(0);

  const [couponLoading, setCouponLoading] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState("");

  // ========================
  // SHIPPING
  // ========================

  const selectedShippingMethod = useMemo(() => {
    return shippingMethods.find((method) => method.id === selectedShippingId);
  }, [shippingMethods, selectedShippingId]);

  const shippingCost = selectedShippingMethod?.price || 0;

  const isPickup = selectedShippingMethod?.isPickup || false;

  // ========================
  // TOTALS
  // ========================

  const subtotal = mounted ? totalPrice() : 0;

  const grandTotal = subtotal + shippingCost - discount;

  // ========================
  // COUPON
  // ========================

  async function handleApplyCoupon() {
    try {
      setCouponLoading(true);

      const result = await validateCoupon(couponCode, subtotal);

      setDiscount(result.discount);

      setAppliedCoupon(result.coupon.code);

      await trackEvent({
        sessionId: getAnalyticsSession(),
        event: "COUPON_APPLIED",
        metadata: {
          code: result.coupon.code,
          discount: result.discount,
        },
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setCouponLoading(false);
    }
  }

  // ========================
  // CHECKOUT
  // ========================

  async function handleCheckout() {
    try {
      if (items.length === 0) {
        throw new Error("Cart is empty");
      }

      setLoading(true);

      const order = await createOrder({
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),

        shippingMethodId: selectedShippingId,

        shippingCost,

        shippingAddress: address,

        shippingPhone: phone,

        customerName: fullName,

        paymentMethod,

        couponCode: appliedCoupon || undefined,

        discount,
      });

      clearCart();

      setSuccessOrderId(order.id);

      await trackEvent({
        sessionId: getAnalyticsSession(),
        event: "ORDER_COMPLETE",
        metadata: {
          orderId: order.id,
          total: grandTotal,
        },
      });
    } catch (error: any) {
      console.error(error);

      alert(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  // ========================
  // WAIT FOR HYDRATION
  // ========================

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading checkout...
      </div>
    );
  }

  // ========================
  // UI
  // ========================

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10">
          <CheckoutForm
            fullName={fullName}
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedShippingId={selectedShippingId}
            setSelectedShippingId={setSelectedShippingId}
            shippingMethods={shippingMethods}
            isPickup={isPickup}
          />

          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            discount={discount}
            grandTotal={grandTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            couponLoading={couponLoading}
            appliedCoupon={appliedCoupon}
            handleApplyCoupon={handleApplyCoupon}
            loading={loading}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>

      <SuccessModal successOrderId={successOrderId} router={router} />
    </>
  );
}
