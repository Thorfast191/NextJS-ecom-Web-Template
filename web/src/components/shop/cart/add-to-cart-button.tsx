"use client";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: string;

    variantId?: string;

    name: string;

    slug?: string;

    imageUrl?: string | null;

    price: number;

    stock: number;

    size?: string | null;

    color?: string | null;

    sku?: string | null;

    originalPrice?: number;

    discountType?: string | null;

    discountValue?: number | null;
  };
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      disabled={product.stock <= 0}
      onClick={() =>
        addItem({
          productId: product.id,

          variantId: product.variantId,

          name: product.name,

          slug: product.slug || "",

          imageUrl: product.imageUrl,

          size: product.size,

          color: product.color,

          sku: product.sku,

          price: product.price,

          originalPrice: product.originalPrice,

          discountType: product.discountType,

          discountValue: product.discountValue,

          stock: product.stock,

          quantity: 1,
        })
      }
      className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400"
    >
      {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
    </button>
  );
}