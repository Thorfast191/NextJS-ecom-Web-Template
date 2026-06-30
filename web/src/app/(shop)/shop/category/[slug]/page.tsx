import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/actions/category.actions";
import { getProductsByCategory } from "@/actions/product.actions";

import ProductCard from "@/components/shop/product/product-card";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-5xl font-bold">{category.name}</h1>

          <p className="mt-2 text-slate-400">
            {products.length} Product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* PRODUCTS */}

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
