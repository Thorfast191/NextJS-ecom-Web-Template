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
  category: Category | null;
  onClose: () => void;
}

export default function CategoryDrawer({ category, onClose }: Props) {
  if (!category) return null;

  return (
    <>
      {/* BACKDROP */}

      <div
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-xl overflow-y-auto border-l border-white/10 bg-slate-950">
        {/* HEADER */}

        <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 px-8 py-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[6px] text-blue-400">
                Collection
              </p>

              <h2 className="mt-2 text-3xl font-black">{category.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                transition
                hover:border-white/30
              "
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-8">
          {category.children?.length ? (
            <div className="space-y-3">
              {category.children.map((child) => (
                <Link
                  key={child.id}
                  href={`/shop/category/${child.slug}`}
                  onClick={onClose}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    transition-all
                    duration-300
                    hover:border-blue-400
                    hover:bg-white/[0.05]
                  "
                >
                  <div>
                    <h3 className="font-semibold">{child.name}</h3>

                    <p className="mt-1 text-sm text-slate-500">View products</p>
                  </div>

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 p-6 text-center">
              <p className="text-slate-500">No subcategories found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
