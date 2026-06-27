import { prisma } from "@/lib/prisma";

import { getAdminProducts } from "@/actions/product.actions";

import ProductForm from "@/components/admin/products/product-form";
import ProductsTable from "@/components/admin/products/products-table";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search || "";

  const products = await getAdminProducts(1, search);

  const categories = await prisma.category.findMany({
    include: {
      parent: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Products</h1>

        <p className="text-slate-400 mt-2">Manage store products</p>
      </div>

      {/* SEARCH */}

      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by name, SKU, barcode..."
          className="w-full h-12 rounded-xl border border-slate-800 bg-slate-900 px-4 text-white"
        />
      </form>

      {/* CREATE PRODUCT */}

      <ProductForm categories={categories} />

      {/* PRODUCTS TABLE */}

      <ProductsTable products={products} />
    </div>
  );
}
