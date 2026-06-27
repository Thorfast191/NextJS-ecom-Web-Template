import { Trash2 } from "lucide-react";

import { deleteCategory } from "@/actions/category.actions";

interface Props {
  categories: any[];
}

export default function CategoriesTable({ categories }: Props) {
  const parentCategories = categories.filter((category) => !category.parentId);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-950">
          <tr className="text-left">
            <th className="p-4">Category</th>

            <th className="p-4">Slug</th>

            <th className="p-4">Type</th>

            <th className="p-4">Parent</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {parentCategories.map((parent) => (
            <>
              {/* PARENT */}

              <tr key={parent.id} className="border-t border-slate-800">
                <td className="p-4 font-semibold">{parent.name}</td>

                <td className="p-4 text-slate-400">/{parent.slug}</td>

                <td className="p-4 text-green-400">Parent</td>

                <td className="p-4">—</td>

                <td className="p-4">
                  <form
                    action={async () => {
                      "use server";

                      await deleteCategory(parent.id);
                    }}
                  >
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>

              {/* CHILDREN */}

              {categories
                .filter((child) => child.parentId === parent.id)
                .map((child) => (
                  <tr
                    key={child.id}
                    className="border-t border-slate-800 bg-slate-950/30"
                  >
                    <td className="p-4 pl-10">└ {child.name}</td>

                    <td className="p-4 text-slate-400">/{child.slug}</td>

                    <td className="p-4 text-blue-400">Subcategory</td>

                    <td className="p-4">{parent.name}</td>

                    <td className="p-4">
                      <form
                        action={async () => {
                          "use server";

                          await deleteCategory(child.id);
                        }}
                      >
                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
