"use client";

import Link from "next/link";

import { Trash2, Plus, Minus } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalPrice } =
    useCartStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <p className="text-slate-400 mt-2">Review your items before checkout</p>
      </div>

      {/* EMPTY */}

      {items.length === 0 && (
        <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>

          <p className="text-slate-400 mb-6">
            Add products to continue shopping
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* CART */}

      {items.length > 0 && (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8">
          {/* ITEMS */}

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId ?? "default"}`}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-6"
              >
                {/* IMAGE */}

                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-2xl border border-slate-800"
                  />
                ) : (
                  <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                        <span className="text-lg">🛍️</span>
                      </div>

                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        No Image
                      </p>
                    </div>
                  </div>
                )}

                {/* INFO */}

                <div className="flex-1">
                  {/* TITLE */}

                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  {/* VARIANTS */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.size && (
                      <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                        Size: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
                        Color: {item.color}
                      </span>
                    )}
                  </div>

                  {/* PRICE */}

                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    {/* FINAL PRICE */}

                    <p className="text-lg font-bold">৳ {item.price}</p>

                    {/* ORIGINAL PRICE */}

                    {item.originalPrice && item.originalPrice > item.price && (
                      <p className="text-sm text-slate-500 line-through">
                        ৳ {item.originalPrice}
                      </p>
                    )}

                    {/* DISCOUNT */}

                    {item.discountType && item.discountValue && (
                      <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
                        {item.discountType === "PERCENTAGE"
                          ? `${item.discountValue}% OFF`
                          : `৳${item.discountValue} OFF`}
                      </span>
                    )}
                  </div>

                  {/* SUBTOTAL */}

                  <p className="text-sm text-slate-400 mt-2">
                    Subtotal: ৳ {item.price * item.quantity}
                  </p>

                  {/* QUANTITY */}

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          `${item.productId}-${item.variantId ?? "default"}`,
                        )
                      }
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-lg font-semibold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          `${item.productId}-${item.variantId ?? "default"}`,
                        )
                      }
                      disabled={item.quantity >= item.stock}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:bg-slate-700 disabled:text-slate-500 flex items-center justify-center transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeItem(
                      `${item.productId}-${item.variantId ?? "default"}`,
                    )
                  }
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-10">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              {/* SUBTOTAL */}

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Subtotal</span>

                <span>৳ {totalPrice()}</span>
              </div>

              {/* SHIPPING */}

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Shipping</span>

                <span>As per your requirement.</span>
              </div>

              {/* TOTAL */}

              <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xl font-bold">
                <span>Total</span>

                <span>৳ {totalPrice()}</span>
              </div>
            </div>

            {/* BUTTON */}

            <Link
              href="/checkout"
              className="mt-8 w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center font-medium transition"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
