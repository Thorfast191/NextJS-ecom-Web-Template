"use client";

import CheckoutItems from "./checkout-items";

interface Props {
  items: any[];

  subtotal: number;

  shippingCost: number;

  discount: number;

  grandTotal: number;

  couponCode: string;

  setCouponCode: (value: string) => void;

  couponLoading: boolean;

  appliedCoupon: string;

  handleApplyCoupon: () => void;

  loading: boolean;

  handleCheckout: () => void;
}

export default function CheckoutSummary({
  items,
  subtotal,
  shippingCost,
  discount,
  grandTotal,
  couponCode,
  setCouponCode,
  couponLoading,
  appliedCoupon,
  handleApplyCoupon,
  loading,
  handleCheckout,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-fit sticky top-28">
      <h2 className="text-3xl font-black mb-8">Order Summary</h2>

      {/* ITEMS */}

      <CheckoutItems items={items} />

      {/* COUPON */}

      <div className="mt-8">
        <label className="block mb-3 text-sm text-slate-400">Promo Code</label>

        <div className="flex gap-3">
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="WELCOME10"
            className="flex-1 h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
          />

          <button
            disabled={couponLoading}
            onClick={handleApplyCoupon}
            className="px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700"
          >
            Apply
          </button>
        </div>

        {appliedCoupon && (
          <p className="text-green-400 text-sm mt-3">
            Coupon "{appliedCoupon}" applied
          </p>
        )}
      </div>

      {/* TOTALS */}

      <div className="border-t border-slate-800 mt-8 pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Subtotal</span>

          <span>৳ {subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Shipping</span>

          <span>৳ {shippingCost}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-400">
            <span>Discount</span>

            <span>- ৳ {discount}</span>
          </div>
        )}

        <div className="border-t border-slate-800 pt-5 flex items-center justify-between text-2xl font-black">
          <span>Total</span>

          <span>৳ {grandTotal}</span>
        </div>
      </div>

      {/* BUTTON */}

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="mt-8 w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-slate-700 font-bold transition"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
