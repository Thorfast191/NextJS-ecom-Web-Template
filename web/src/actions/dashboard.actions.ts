"use server";

import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getDashboardAnalytics() {
  const allowed = await hasPermission("manage_dashboard");

  if (!allowed) {
    redirect("/admin/login?expired=true");
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const [
    revenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    lowStockProducts,
    pendingOrders,
    revenueToday,
    visitorsTodayRaw,
    totalVisitorsRaw,

    productViews,
    addToCarts,
    purchases,
    wishlistAdds,

    checkoutStarts,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.order.count(),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.product.count(),

    prisma.productVariant.count({
      where: {
        stock: {
          lte: 5,
        },
        isActive: true,
      },
    }),

    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.pageView.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
      distinct: ["sessionId"],
      select: {
        sessionId: true,
      },
    }),

    prisma.pageView.findMany({
      distinct: ["sessionId"],
      select: {
        sessionId: true,
      },
    }),

    prisma.customerJourney.count({
      where: {
        event: "PRODUCT_VIEW",
      },
    }),

    prisma.customerJourney.count({
      where: {
        event: "ADD_TO_CART",
      },
    }),

    prisma.customerJourney.count({
      where: {
        event: "PURCHASE",
      },
    }),

    prisma.customerJourney.count({
      where: {
        event: "WISHLIST_ADD",
      },
    }),

    prisma.customerJourney.count({
      where: {
        event: "BEGIN_CHECKOUT",
      },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const recentCustomers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    take: 5,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      orders: true,
    },
  });

  const topProductsRaw = await prisma.orderItem.groupBy({
    by: ["productId"],

    _sum: {
      quantity: true,
    },

    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },

    take: 5,
  });

  const productIds = topProductsRaw.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },

    select: {
      id: true,
      name: true,
      price: true,
      imageUrl: true,
    },
  });

  const topProducts = topProductsRaw.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    return {
      ...(product || {}),

      sold: item._sum.quantity || 0,
    };
  });

  const revenueChartRaw = await prisma.order.findMany({
    select: {
      total: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const revenueMap: Record<string, number> = {};

  for (const order of revenueChartRaw) {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    revenueMap[month] = (revenueMap[month] || 0) + order.total;
  }

  const revenueChart = Object.entries(revenueMap).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  const visitorsToday = visitorsTodayRaw.length;

  const totalVisitors = totalVisitorsRaw.length;

  const averageOrderValue =
    totalOrders > 0 ? Number(revenue._sum.total || 0) / totalOrders : 0;

  const conversionRate =
    totalVisitors > 0
      ? Number(((totalOrders / totalVisitors) * 100).toFixed(2))
      : 0;

  const addToCartRate =
    productViews > 0
      ? Number(((addToCarts / productViews) * 100).toFixed(2))
      : 0;

  const purchaseRate =
    addToCarts > 0 ? Number(((purchases / addToCarts) * 100).toFixed(2)) : 0;

  return {
    totalRevenue: revenue._sum.total || 0,

    revenueToday: revenueToday._sum.total || 0,

    totalOrders,

    totalCustomers,

    totalProducts,

    lowStockProducts,

    pendingOrders,

    visitorsToday,

    totalVisitors,

    averageOrderValue: averageOrderValue.toFixed(0),

    conversionRate,

    productViews,

    addToCarts,

    purchases,

    addToCartRate,

    purchaseRate,

    recentOrders,

    recentCustomers,

    topProducts,

    revenueChart,

    wishlistAdds,

    checkoutStarts,
  };
}
