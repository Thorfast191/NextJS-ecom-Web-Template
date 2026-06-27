"use client";

import { useState } from "react";

import CategoryDrawer from "./category-drawer";
import AllCategoriesDrawer from "./all-categories-drawer";

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
  categories: Category[];
}

export default function CategoriesShowcase({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <>
      <section className="relative py-28 overflow-hidden">
        {/* BACKGROUND GLOW */}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] bg-blue-500/10 blur-[220px]" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* HEADER */}

          <div className="text-center mb-16">
            <p className="uppercase tracking-[8px] text-blue-400 text-sm">
              Collections
            </p>

            <h2 className="mt-4 text-5xl lg:text-6xl font-black">
              Shop By Category
            </h2>

            <p className="mt-5 text-slate-400 max-w-2xl mx-auto">
              Discover curated collections crafted for every style and occasion.
            </p>
          </div>

          {/* CATEGORY GRID */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  console.log("clicked", category);
                  setSelectedCategory(category);
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  h-44
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-blue-400/40
                  hover:bg-white/[0.05]
                  text-left
                "
              >
                {/* GLOW */}

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                    bg-gradient-to-br
                    from-blue-500/10
                    via-cyan-500/5
                    to-transparent
                  "
                />

                {/* LETTER */}

                <div
                  className="
                    absolute
                    top-2
                    right-4
                    text-[6rem]
                    font-black
                    leading-none
                    text-white/[0.04]
                    transition-all
                    duration-500
                    group-hover:text-blue-400/[0.08]
                    group-hover:scale-110
                  "
                >
                  {category.name.charAt(0)}
                </div>

                {/* CONTENT */}

                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="text-lg lg:text-xl font-black uppercase tracking-[3px]">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-300 transition">
                    View Categories →
                  </p>
                </div>

                {/* LINE */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-blue-400
                    to-cyan-400
                    group-hover:w-full
                    transition-all
                    duration-500
                  "
                />
              </button>
            ))}
          </div>

          {/* CTA */}

          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAllCategories(true)}
              className="
                h-14
                px-10
                rounded-full
                bg-white
                text-black
                font-semibold
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
              "
            >
              View All Collections
            </button>
          </div>
        </div>
      </section>

      <CategoryDrawer
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      <AllCategoriesDrawer
        open={showAllCategories}
        categories={categories}
        onClose={() => setShowAllCategories(false)}
      />
    </>
  );
}
