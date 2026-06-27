"use client";

import { ShieldCheck, Truck, ShoppingBag } from "lucide-react";

import { useState } from "react";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;

    price: number;

    comparePrice?: number | null;

    discountType?: "PERCENTAGE" | "FIXED" | null;
    discountValue?: number | null;

    stock: number;

    category?: {
      name: string;
    } | null;
  };

  variants: {
    id: string;
    size: string | null;
    color: string | null;
    stock: number;
    price: number | null;
  }[];

  pricing: {
    originalPrice: number;
    finalPrice: number;
    isDiscounted: boolean;
  };
}

export default function ProductInfo({ product, pricing, variants }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : null,
  );

  const stock = selectedVariant ? selectedVariant.stock : product.stock;

  const [quantity, setQuantity] = useState(1);

  const displayPrice = selectedVariant?.price ?? pricing.finalPrice;

  const savings = (pricing.originalPrice - pricing.finalPrice).toFixed(2);

  // QUANTITY

  function increaseQuantity() {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  // CART
  function handleAddToCart() {
    if (variants.length === 0) {
      addItem({
        productId: product.id,
        variantId: undefined,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl || null,
        price: pricing.finalPrice,
        stock: product.stock,
        quantity,
      });

      return;
    }

    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      imageUrl: product.imageUrl || null,
      price: displayPrice,
      stock: selectedVariant.stock,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
  }

  function handleBuyNow() {
    if (variants.length === 0) {
      addItem({
        productId: product.id,
        variantId: undefined,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl || null,
        price: pricing.finalPrice,
        stock: product.stock,
        quantity,
      });

      window.location.href = "/checkout";
      return;
    }

    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      imageUrl: product.imageUrl || null,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: displayPrice,
      stock: selectedVariant.stock,
      quantity,
    });

    window.location.href = "/checkout";
  }

  return (
    <div className="w-full">
      {/* CATEGORY */}

      <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-5">
        {product.category?.name || "Premium Fashion"}
      </p>

      {/* TITLE */}

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight break-words">
        {product.name}
      </h1>

      {/* DISCOUNT BADGE */}

      {pricing.isDiscounted && (
        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-bold">
          {product.discountType === "PERCENTAGE"
            ? `${product.discountValue}% OFF`
            : `৳${product.discountValue} OFF`}
        </div>
      )}

      {/* PRICE */}

      <div className="flex items-center flex-wrap gap-4 mt-8">
        {/* FINAL PRICE */}

        <h2 className="text-4xl lg:text-5xl font-black">৳ {displayPrice}</h2>

        {/* ORIGINAL PRICE */}

        {pricing.isDiscounted && (
          <span className="text-xl lg:text-2xl text-slate-500 line-through">
            ৳ {pricing.originalPrice}
          </span>
        )}
      </div>

      {/* SAVINGS */}

      {pricing.isDiscounted && (
        <p className="mt-3 text-green-400 font-semibold">
          You save ৳ {savings}
        </p>
      )}

      {/* STOCK */}
      <div className="mt-5">
        {stock > 0 ? (
          <span className="text-green-400 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-400 font-semibold">Out Of Stock</span>
        )}
      </div>

      {/* DESCRIPTION */}

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Description</h3>

        <p className="text-slate-300 leading-8 whitespace-pre-line">
          {product.description || "No description available."}
        </p>
      </div>

      {/* VARIANTS */}

      {variants.length > 0 && (
        <div className="mt-10">
          <p className="uppercase tracking-[4px] text-slate-400 text-sm mb-4">
            Select Variant
          </p>

          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => {
                  setSelectedVariant(variant);
                  setQuantity(1);
                }}
                className={`px-4 py-3 rounded-2xl border transition ${
                  selectedVariant?.id === variant.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* QUANTITY */}

      <div className="mt-10">
        <p className="uppercase tracking-[4px] text-slate-400 text-sm mb-4">
          Quantity
        </p>

        <div className="flex items-center w-fit border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
          <button
            onClick={decreaseQuantity}
            className="w-14 sm:w-16 h-14 text-2xl hover:bg-slate-800 transition"
          >
            -
          </button>

          <div className="w-14 sm:w-16 h-14 flex items-center justify-center font-bold text-lg">
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="w-14 sm:w-16 h-14 text-2xl hover:bg-slate-800 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {/* ADD TO CART */}

        <button
          disabled={stock <= 0}
          onClick={handleAddToCart}
          className="h-16 rounded-2xl border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-blue-500 transition font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={20} />

          {stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>
        {/* BUY NOW */}
        <button
          disabled={stock <= 0}
          onClick={handleBuyNow}
          className="h-16 rounded-2xl bg-white text-black hover:bg-slate-200 transition font-bold flex items-center justify-center disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      {/* FEATURES */}
      {/* FEATURES */}

      <div className="space-y-5 mt-12">
        {/* SECURE */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center gap-5">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            <ShieldCheck className="text-blue-400" size={24} />
          </div>

          <div>
            <h3 className="font-bold text-lg">Secure Checkout</h3>

            <p className="text-slate-400 text-sm mt-1">
              100% protected payment
            </p>
          </div>
        </div>

        {/* SHIPPING */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center gap-5">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            <Truck className="text-blue-400" size={24} />
          </div>

          <div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>

            <p className="text-slate-400 text-sm mt-1">
              Nationwide shipping available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
