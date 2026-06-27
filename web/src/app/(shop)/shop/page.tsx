import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/product/product-card";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
    },

    include: {
      variants: {
        where: {
          isActive: true,
        },
      },

      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">Shop</h1>

          <p className="mt-2 text-slate-400">Explore all products</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
