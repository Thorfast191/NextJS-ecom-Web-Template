"use client";

import { deleteProduct, toggleProductFlag } from "@/actions/product.actions";
import { Fragment, useState } from "react";

import VariantManagerModal from "@/components/admin/products/variant-manager-modal";

import { useRouter } from "next/navigation";

interface Props {
  products: any[];
}

export default function ProductsTable({ products }: Props) {
  const [variantProduct, setVariantProduct] = useState<any>(null);

  const router = useRouter();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* HEAD */}
          <thead className="bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="p-5 text-left">Image</th>

              <th className="p-5 text-left">Product</th>

              <th className="p-5 text-left">Category</th>

              <th className="p-5 text-left">Price</th>

              <th className="p-5 text-left">Discount</th>

              <th className="p-5 text-left">Variants</th>

              <th className="p-5 text-left">Stock</th>

              <th className="p-5 text-left">Tag</th>

              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.map((product) => (
              <Fragment key={product.id}>
                <tr className="border-b border-slate-800">
                  {/* IMAGE */}

                  <td className="p-5">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-800" />
                    )}
                  </td>

                  {/* PRODUCT */}

                  <td className="p-5">
                    <div>
                      <h3 className="font-bold">{product.name}</h3>

                      <p className="text-sm text-slate-400">{product.slug}</p>

                      <p className="text-xs text-pink-400 mt-1">
                        ❤️ {product._count.wishlists}
                      </p>
                    </div>
                  </td>

                  {/* CATEGORY */}

                  <td className="p-5">
                    {product.category?.parent ? (
                      <div>
                        <div className="font-medium">
                          {product.category.parent.name}
                        </div>

                        <div className="text-sm text-slate-400 ml-3">
                          └─ {product.category.name}
                        </div>
                      </div>
                    ) : (
                      <div>{product.category?.name}</div>
                    )}
                  </td>

                  {/* PRICE */}

                  <td className="p-5">
                    <div>
                      <p className="font-bold">৳ {product.price}</p>

                      {product.comparePrice && (
                        <p className="text-sm text-slate-500 line-through">
                          ৳ {product.comparePrice}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* DISCOUNT */}

                  <td className="p-5">
                    {product.discountType && product.discountValue ? (
                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold">
                        {product.discountType === "PERCENTAGE"
                          ? `-${product.discountValue}%`
                          : `-৳${product.discountValue}`}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>

                  {/* VARIANTS */}
                  <td className="p-5">
                    <button
                      onClick={() => setVariantProduct(product)}
                      className="
      px-3
      py-1
      rounded-full
      bg-blue-500/10
      text-blue-400
      text-sm
      font-semibold
      hover:bg-blue-500/20
    "
                    >
                      Manage Variants
                    </button>
                  </td>

                  {/* STOCK */}

                  <td className="p-5">
                    {product.variants.length > 0
                      ? product.variants.reduce(
                          (sum: number, variant: any) => sum + variant.stock,
                          0,
                        )
                      : product.stock}
                  </td>

                  {/* TAG */}

                  {/* TAG */}

                  <td className="p-5">
                    <div className="flex flex-col gap-2 text-sm min-w-[140px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-500"
                          checked={product.isFeatured}
                          onChange={async () => {
                            await toggleProductFlag(product.id, "isFeatured");
                            router.refresh();
                          }}
                        />
                        Featured
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-500"
                          checked={product.isTrending}
                          onChange={async () => {
                            await toggleProductFlag(product.id, "isTrending");
                            router.refresh();
                          }}
                        />
                        Trending
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-500"
                          checked={product.isBestSeller}
                          onChange={async () => {
                            await toggleProductFlag(product.id, "isBestSeller");
                            router.refresh();
                          }}
                        />
                        Best Seller
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-500"
                          checked={product.isNewArrival}
                          onChange={async () => {
                            await toggleProductFlag(product.id, "isNewArrival");
                            router.refresh();
                          }}
                        />
                        New Arrival
                      </label>
                    </div>
                  </td>

                  {/* ACTIONS */}

                  <td className="p-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `/admin/products/label/${product.id}`,
                            "_blank",
                          )
                        }
                        className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        Print Label
                      </button>

                      <button
                        onClick={async () => {
                          const confirmed = confirm(
                            "Delete this product permanently?\n\nThis action cannot be undone.",
                          );

                          if (!confirmed) return;

                          await deleteProduct(product.id);

                          router.refresh();
                        }}
                        className="h-10 px-5 rounded-xl bg-red-500 hover:bg-red-600 transition text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {variantProduct && (
        <VariantManagerModal
          product={variantProduct}
          onClose={() => {
            setVariantProduct(null);

            router.refresh();
          }}
        />
      )}
    </div>
  );
}
