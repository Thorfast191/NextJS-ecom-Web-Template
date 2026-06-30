"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import WishlistButton from "./wishlist-button";
import { getProductPrice } from "@/lib/pricing";

import { getAnalyticsSession } from "@/lib/analytics";
import { trackEvent } from "@/actions/analytics.actions";

interface Props {
  product: {
    id: string;

    name: string;

    slug: string;

    stock: number;

    price: number;

    comparePrice?: number | null;

    discountType?: "PERCENTAGE" | "FIXED" | null;

    discountValue?: number | null;

    discountStartAt?: Date | string | null;

    discountEndAt?: Date | string | null;
    isFeatured?: boolean;

    isTrending?: boolean;

    isBestSeller?: boolean;

    isNewArrival?: boolean;

    images?: {
      imageUrl: string;
    }[];

    variants: {
      id: string;

      size: string | null;

      color: string | null;

      stock: number;

      price: number | null;
    }[];
  };
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const pricing = getProductPrice(product);

  const defaultVariant = product.variants?.[0];

  const stock =
    product.variants.length > 0
      ? product.variants.reduce(
          (sum, variant) => sum + Number(variant.stock || 0),
          0,
        )
      : product.stock;

  const image = product.images?.[0]?.imageUrl || null;

  function handleAddToCart() {
    // SIMPLE PRODUCT

    if (product.variants.length === 0) {
      addItem({
        productId: product.id,

        variantId: undefined,

        name: product.name,

        slug: product.slug,

        imageUrl: image,

        size: undefined,

        color: undefined,

        price: pricing.finalPrice,

        stock: product.stock,

        quantity: 1,
      });
      trackEvent({
        sessionId: getAnalyticsSession(),

        event: "ADD_TO_CART",

        productId: product.id,
      });

      return;
    }

    // VARIANT PRODUCT

    if (!defaultVariant) return;

    addItem({
      productId: product.id,

      variantId: defaultVariant.id,

      name: product.name,

      slug: product.slug,

      imageUrl: image,

      size: defaultVariant.size,

      color: defaultVariant.color,

      price: defaultVariant.price ?? pricing.finalPrice,

      stock: defaultVariant.stock,

      quantity: 1,
    });
    trackEvent({
      sessionId: getAnalyticsSession(),

      event: "ADD_TO_CART",

      productId: product.id,
    });
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl">
      {/* WISHLIST */}

      <div className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 p-2 backdrop-blur-md">
        <WishlistButton productId={product.id} />
      </div>

      {/* IMAGE */}

      <Link
        href={`/shop/${product.slug}`}
        className="block overflow-hidden bg-slate-950"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-80 w-full rounded-t-3xl object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-80 flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <ShoppingBag
              size={56}
              strokeWidth={1.5}
              className="mb-4 text-slate-600"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              No Image Available
            </p>
          </div>
        )}
      </Link>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-6">
        {/* BADGES */}

        <div className="mb-3 flex min-h-[28px] flex-wrap gap-2">
          {pricing.isDiscounted && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              {product.discountType === "PERCENTAGE"
                ? `-${product.discountValue}%`
                : `-৳${product.discountValue}`}
            </span>
          )}

          {product.isNewArrival && (
            <span className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
              New Arrival
            </span>
          )}

          {product.isBestSeller && (
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black">
              Best Seller
            </span>
          )}

          {product.isTrending && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              Trending
            </span>
          )}

          {product.isFeatured && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
              Featured
            </span>
          )}
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-blue-400">
            {product.name}
          </h3>
        </Link>

        {/* STOCK */}

        {stock > 0 ? (
          <span className="mt-3 inline-flex w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
            In Stock
          </span>
        ) : (
          <span className="mt-3 inline-flex w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            Out Of Stock
          </span>
        )}

        {/* PRICE */}

        <div className="mt-5 flex items-end gap-3">
          <p className="text-4xl font-black tracking-tight">
            ৳ {pricing.finalPrice}
          </p>

          {pricing.isDiscounted && (
            <p className="text-lg text-slate-500 line-through">
              ৳ {pricing.originalPrice}
            </p>
          )}
        </div>

        {/* SAVINGS */}

        {pricing.isDiscounted && (
          <p className="mt-2 text-sm font-medium text-green-400">
            You save ৳ {(pricing.originalPrice - pricing.finalPrice).toFixed(2)}
          </p>
        )}

        {/* BUTTON */}

        <button
          disabled={stock <= 0}
          onClick={handleAddToCart}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black transition-all duration-300 hover:bg-blue-600 hover:text-white disabled:bg-slate-800 disabled:text-slate-500"
        >
          <ShoppingBag size={18} />

          {stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}
