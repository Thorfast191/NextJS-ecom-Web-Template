import { prisma } from "@/lib/prisma";

import AddToCartButton from "@/components/shop/cart/add-to-cart-button";

import { getDefaultVariant, getProductStock } from "@/lib/product";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
    },

    where: {
      isArchived: false,
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-white mb-10">Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => {
          // DEFAULT VARIANT

          const defaultVariant = getDefaultVariant(product);

          // TOTAL STOCK

          const totalStock = getProductStock(product);

          return (
            <div
              key={product.id}
              className="bg-slate-900 rounded-xl overflow-hidden"
            >
              {/* IMAGE */}

              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
              )}

              {/* CONTENT */}

              <div className="p-4">
                <h2 className="text-xl font-bold text-white">{product.name}</h2>

                {/* PRICE */}

                <p className="text-slate-400 mt-2">₹ {product.price}</p>

                {/* STOCK */}

                <p className="text-sm text-slate-500 mt-2">
                  Stock: {totalStock}
                </p>

                {/* VARIANT */}

                {defaultVariant && (
                  <p className="text-sm text-slate-400 mt-1">
                    {defaultVariant.size}
                    {defaultVariant.color && ` / ${defaultVariant.color}`}
                  </p>
                )}

                {/* BUTTON */}

                <div className="mt-4">
                  <AddToCartButton
                    product={{
                      id: product.id,

                      variantId: defaultVariant?.id,

                      name: product.name,

                      price: defaultVariant?.price || product.price,

                      imageUrl: product.imageUrl || "",

                      stock: defaultVariant?.stock || 0,

                      size: defaultVariant?.size,

                      color: defaultVariant?.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
