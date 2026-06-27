import { createCategory } from "@/actions/category.actions";

interface Props {
  categories: any[];
}

export default function CategoryForm({ categories }: Props) {
  const parentCategories = categories.filter((category) => !category.parentId);

  return (
    <form
      action={createCategory}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Category</h2>

      {/* NAME */}

      <div>
        <label className="block mb-2 text-sm">Category Name</label>

        <input
          name="name"
          required
          placeholder="Shirts"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* SLUG */}

      <div>
        <label className="block mb-2 text-sm">Slug</label>

        <input
          name="slug"
          required
          placeholder="shirts"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* PARENT */}

      <div>
        <label className="block mb-2 text-sm">Parent Category</label>

        <select
          name="parentId"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        >
          <option value="">None</option>

          {parentCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* BUTTON */}

      <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-lg">
        Create Category
      </button>
    </form>
  );
}
