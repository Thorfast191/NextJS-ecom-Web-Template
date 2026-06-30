import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function GET() {
  try {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    // =========================
    // TODAY REVENUE
    // =========================

    const todayRevenue = await prisma.order.aggregate({
      where: {
        status: "DELIVERED",

        createdAt: {
          gte: startOfDay,
        },
      },

      _sum: {
        total: true,
      },
    });

    // =========================
    // TOTAL REVENUE
    // =========================

    const totalRevenue = await prisma.order.aggregate({
      where: {
        status: "DELIVERED",
      },

      _sum: {
        total: true,
      },
    });

    // =========================
    // ORDERS TODAY
    // =========================

    const ordersToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfDay,
        },
      },
    });

    // =========================
    // TOTAL PRODUCTS
    // =========================

    const totalProducts = await prisma.product.count({
      where: {
        isArchived: false,
      },
    });

    // =========================
    // PRODUCTS + VARIANTS
    // =========================

    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
      },

      include: {
        variants: true,
      },
    });

    // =========================
    // LOW STOCK ITEMS
    // =========================

    const lowStockItems: any[] = [];

    for (const product of products) {
      if (product.variants.length > 0) {
        for (const variant of product.variants) {
          if (variant.isActive && variant.stock <= 10) {
            lowStockItems.push({
              id: variant.id,

              name: `${product.name} (${variant.color || "-"} / ${variant.size || "-"})`,

              stock: variant.stock,

              type: "variant",
            });
          }
        }
      } else {
        if (product.stock <= 10) {
          lowStockItems.push({
            id: product.id,

            name: product.name,

            stock: product.stock,

            type: "product",
          });
        }
      }
    }

    lowStockItems.sort((a, b) => a.stock - b.stock);

    const lowStockProducts = lowStockItems.slice(0, 10);

    // =========================
    // RECENT SALES
    // =========================

    const recentSales = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    });

    // =========================
    // TOP PRODUCTS
    // =========================

    const groupedSales = await prisma.orderItem.groupBy({
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

    const productIds = groupedSales.map((item) => item.productId);

    const topProductsData = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const topProducts = groupedSales.map((item) => ({
      productId: item.productId,

      quantity: item._sum.quantity || 0,

      product:
        topProductsData.find((product) => product.id === item.productId) ||
        null,
    }));

    return NextResponse.json(
      {
        revenueToday: todayRevenue._sum.total || 0,

        totalRevenue: totalRevenue._sum.total || 0,

        ordersToday,

        totalProducts,

        lowStockCount: lowStockProducts.length,

        recentSales,

        lowStockProducts,

        topProducts,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error("DASHBOARD ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to load dashboard",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
