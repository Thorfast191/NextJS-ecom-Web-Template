"use server";

import { prisma } from "@/lib/prisma";

// ========================
// TRACK EVENT
// ========================

export async function trackEvent(data: {
  sessionId: string;
  event: string;
  path?: string;
  productId?: string;
  orderId?: string;
  metadata?: any;
}) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        sessionId: data.sessionId,

        event: data.event,

        path: data.path || null,

        productId: data.productId || null,

        orderId: data.orderId || null,

        metadata: data.metadata || undefined,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
  }
}

// ========================
// GET ANALYTICS COUNTS
// ========================

export async function getAnalyticsSummary() {
  const [
    pageViews,
    productViews,
    addToCarts,
    wishlistAdds,
    checkoutStarts,
    purchases,
  ] = await Promise.all([
    prisma.analyticsEvent.count({
      where: {
        event: "PAGE_VIEW",
      },
    }),

    prisma.analyticsEvent.count({
      where: {
        event: "PRODUCT_VIEW",
      },
    }),

    prisma.analyticsEvent.count({
      where: {
        event: "ADD_TO_CART",
      },
    }),

    prisma.analyticsEvent.count({
      where: {
        event: "WISHLIST_ADD",
      },
    }),

    prisma.analyticsEvent.count({
      where: {
        event: "BEGIN_CHECKOUT",
      },
    }),

    prisma.analyticsEvent.count({
      where: {
        event: "PURCHASE",
      },
    }),
  ]);

  return {
    pageViews,
    productViews,
    addToCarts,
    wishlistAdds,
    checkoutStarts,
    purchases,
  };
}

// ========================
// TOP VIEWED PRODUCTS
// ========================

export async function getTopViewedProducts(limit = 10) {
  const views = await prisma.analyticsEvent.groupBy({
    by: ["productId"],

    where: {
      event: "PRODUCT_VIEW",

      productId: {
        not: null,
      },
    },

    _count: {
      productId: true,
    },

    orderBy: {
      _count: {
        productId: "desc",
      },
    },

    take: limit,
  });

  const productIds = views
    .map((view) => view.productId)
    .filter(Boolean) as string[];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },

    select: {
      id: true,

      name: true,

      imageUrl: true,

      price: true,
    },
  });

  return views.map((view) => ({
    ...products.find((p) => p.id === view.productId),

    views: view._count.productId,
  }));
}
