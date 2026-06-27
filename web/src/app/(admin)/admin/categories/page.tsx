import { getCategories } from "@/actions/category.actions";

import CategoryForm from "@/components/admin/categories/category-form";

import CategoriesTable from "@/components/admin/categories/categories-table";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Categories</h1>

        <p className="text-slate-400 mt-2">
          Manage ecommerce category structure
        </p>
      </div>

      {/* CREATE */}

      <CategoryForm categories={categories} />

      {/* TABLE */}

      <CategoriesTable categories={categories} />
    </div>
  );
}
