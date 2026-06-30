import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/product/product-card";

export default async function TrendingPage() {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
      isTrending: true,
    },

    include: {
      variants: {
        where: {
          isActive: true,
        },
      },

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-black mb-2">Trending</h1>

        <p className="text-slate-400 mb-10">Most popular products</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
<ProductCard

  key={product.id}

  product={product}

/>
          ))}
        </div>
      </div>
    </div>
  );
}
