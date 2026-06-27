"use client";

import Link from "next/link";

interface ChildCategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  children: ChildCategory[];
}

interface Props {
  open: boolean;
  categories: Category[];
  onClose: () => void;
}

export default function AllCategoriesDrawer({
  open,
  categories,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-3xl overflow-y-auto border-l border-white/10 bg-slate-950">
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-8 py-6 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[6px] text-blue-400">
              Collections
            </p>

            <h2 className="mt-2 text-3xl font-black">All Categories</h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition"
          >
            ✕
          </button>
        </div>

        {/* Categories */}

        <div className="space-y-8 p-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="mb-5 text-2xl font-black uppercase tracking-[2px]">
                {category.name}
              </h3>

              {category.children?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {category.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/shop/category/${child.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-2xl border border-white/10 p-4 hover:border-blue-400 hover:bg-white/5 transition-all"
                    >
                      <span>{child.name}</span>

                      <span>→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No subcategories</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
