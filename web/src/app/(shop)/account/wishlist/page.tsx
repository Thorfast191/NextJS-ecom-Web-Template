import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

import ProductCard from "@/components/shop/product/product-card";

export default async function WishlistPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/shop/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/shop/login");
  }

  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId: user.id,
    },

    include: {
      product: {
        include: {
          images: true,

          variants: true,

          category: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            Wishlist
          </p>

          <h1 className="text-5xl font-black">Saved Products</h1>
        </div>

        {/* EMPTY */}

        {wishlist.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-slate-400">
            Your wishlist is empty.
          </div>
        )}

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
}
