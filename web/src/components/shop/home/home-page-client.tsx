"use client";

import { useState } from "react";

import CategoryHero from "./category-hero";
import AllCategoriesDrawer from "@/components/shop/home/all-categories-drawer";

interface Props {
  categories: any[];
}

export default function HomePageClient({ categories }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <CategoryHero onExploreClick={() => setDrawerOpen(true)} />

      <AllCategoriesDrawer
        open={drawerOpen}
        categories={categories}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
