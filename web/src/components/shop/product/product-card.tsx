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
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:border-blue-500">
      {/* BADGES */}

      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
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

      {/* WISHLIST */}

      <div className="absolute right-4 top-4 z-20">
        <WishlistButton productId={product.id} />
      </div>

      {/* IMAGE */}

      <Link href={`/shop/${product.slug}`} className="block overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-slate-800 text-slate-500">
            No Image
          </div>
        )}
      </Link>

      {/* CONTENT */}

      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="line-clamp-1 text-xl font-bold transition hover:text-blue-400">
            {product.name}
          </h3>
        </Link>

        {/* STOCK */}

        {stock > 0 ? (
          <span className="text-sm text-green-400">In Stock</span>
        ) : (
          <span className="text-sm text-red-400">Out Of Stock</span>
        )}

        {/* PRICE */}

        <div className="mt-4 flex items-center gap-3">
          <p className="text-3xl font-black">৳ {pricing.finalPrice}</p>

          {pricing.isDiscounted && (
            <p className="text-slate-500 line-through">
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
          className="
            mt-5
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            font-semibold
            text-black
            transition
            hover:bg-slate-200
            disabled:bg-slate-800
            disabled:text-slate-500
          "
        >
          <ShoppingBag size={18} />

          {stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}
