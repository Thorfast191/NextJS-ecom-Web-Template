import { prisma } from "@/lib/prisma";

import CategoryHero from "@/components/shop/home/category-hero";
import CategoriesShowcase from "@/components/shop/home/categories-showcase";
import FeaturedCollection from "@/components/shop/home/featured-collection";
import NewArrivalsSection from "@/components/shop/home/new-arrivals-section";
import BestSellersSection from "@/components/shop/home/best-sellers-section";
import TrendingSection from "@/components/shop/home/trending-section";
import CampaignBanner from "@/components/shop/home/campaign-banner";
import HomePageClient from "@/components/shop/home/home-page-client";

export default async function HomePage() {
  const [
    categories,
    featuredProducts,
    newArrivals,
    trendingProducts,
    bestSellers,
  ] = await Promise.all([
    prisma.category.findMany({
      where: {
        parentId: null,
      },

      include: {
        children: {
          orderBy: {
            name: "asc",
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    }),

    prisma.product.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
      },

      include: {
        variants: {
          where: {
            isActive: true,
          },
        },

        images: true,
      },

      take: 4,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      where: {
        isArchived: false,
        isNewArrival: true,
      },

      include: {
        variants: {
          where: {
            isActive: true,
          },
        },

        images: true,
      },

      take: 8,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      where: {
        isArchived: false,
        isTrending: true,
      },

      include: {
        variants: {
          where: {
            isActive: true,
          },
        },

        images: true,
      },

      take: 8,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      where: {
        isArchived: false,
        isBestSeller: true,
      },

      include: {
        variants: {
          where: {
            isActive: true,
          },
        },

        images: true,
      },

      take: 8,

      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <main className="overflow-x-hidden bg-slate-950 text-white">
      {/* HERO */}

      <HomePageClient categories={categories} />

      {/* CATEGORIES */}

      {categories.length > 0 && <CategoriesShowcase categories={categories} />}

      {/* FEATURED COLLECTION */}

      {featuredProducts.length > 0 && (
        <FeaturedCollection products={featuredProducts} />
      )}

      {/* NEW ARRIVALS */}

      {newArrivals.length > 0 && <NewArrivalsSection products={newArrivals} />}

      {/* MOST WANTED */}

      {bestSellers.length > 0 && <BestSellersSection products={bestSellers} />}

      {/* TRENDING */}

      {trendingProducts.length > 0 && (
        <TrendingSection products={trendingProducts} />
      )}

      {/* CAMPAIGN */}

      <CampaignBanner />
    </main>
  );
}
