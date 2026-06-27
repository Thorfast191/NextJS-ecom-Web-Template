import { prisma } from "@/lib/prisma";

import { getAdminProducts } from "@/actions/product.actions";

import ProductForm from "@/components/admin/products/product-form";

import ProductsTable from "@/components/admin/products/products-table";

export default async function ProductsPage() {
  const products = await getAdminProducts();

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parentId: true,

      parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Products</h1>

        <p className="text-slate-400 mt-2">Manage store products</p>
      </div>

      <ProductForm categories={categories} />

      <ProductsTable products={products} />
    </div>
  );
}
