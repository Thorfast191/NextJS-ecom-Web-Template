"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/auth";

// ======================
// CUSTOMER WISHLIST
// ======================

export async function toggleWishlist(productId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existing = await prisma.wishlist.findFirst({
    where: {
      userId: user.id,
      productId,
    },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: {
        id: existing.id,
      },
    });

    return;
  }

  await prisma.wishlist.create({
    data: {
      userId: user.id,
      productId,
    },
  });
}

// ======================
// ADMIN WISHLIST REPORT
// ======================

export async function getWishlistProducts() {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const wishlistStats = await prisma.wishlist.groupBy({
    by: ["productId"],

    _count: {
      productId: true,
    },

    orderBy: {
      _count: {
        productId: "desc",
      },
    },
  });

  const productIds = wishlistStats.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },

    include: {
      category: {
        include: {
          parent: true,
        },
      },

      variants: true,

      _count: {
        select: {
          wishlists: true,
        },
      },
    },
  });

  return products
    .map((product) => ({
      ...product,
      wishlistCount: product._count.wishlists,
    }))
    .sort((a, b) => b.wishlistCount - a.wishlistCount);
}
