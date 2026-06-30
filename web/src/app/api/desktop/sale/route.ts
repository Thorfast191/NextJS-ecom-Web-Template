import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      items,
      paymentMethod = "COD",
      customerName,
      shippingPhone,
      couponCode,
      discount = 0,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    let subtotal = 0;

    // ========================
    // VALIDATE PRODUCTS + STOCK
    // ========================

    for (const item of items) {
      if (!item.productId) {
        return NextResponse.json(
          {
            error: "Invalid product id in cart",
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }

      // VARIANT PRODUCT

      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: {
            id: item.variantId,
          },

          include: {
            product: true,
          },
        });

        if (!variant) {
          return NextResponse.json(
            {
              error: "Variant not found",
            },
            {
              status: 404,
              headers: desktopCors,
            },
          );
        }

        if (!variant.isActive) {
          return NextResponse.json(
            {
              error: `${variant.product.name} variant is inactive`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }

        if (variant.stock < Number(item.quantity)) {
          return NextResponse.json(
            {
              error: `${variant.product.name} only has ${variant.stock} in stock`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }

      // NON VARIANT PRODUCT
      else {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          return NextResponse.json(
            {
              error: `Product not found`,
            },
            {
              status: 404,
              headers: desktopCors,
            },
          );
        }

        if (product.stock < Number(item.quantity)) {
          return NextResponse.json(
            {
              error: `${product.name} only has ${product.stock} in stock`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }

      subtotal += Number(item.price) * Number(item.quantity);
    }

    const total = Math.max(0, subtotal - Number(discount || 0));

    // ========================
    // CREATE ORDER
    // ========================

    const order = await prisma.order.create({
      data: {
        customerName: customerName || "Walk-In Customer",

        shippingPhone: shippingPhone || null,

        total,

        discount: Number(discount || 0),

        couponCode: couponCode || null,

        paymentMethod,

        isPaid: true,

        paidAt: new Date(),

        status: "DELIVERED",
      },
    });

    // ========================
    // CREATE ORDER ITEMS
    // ========================

    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,

          productId: item.productId,

          variantId: item.variantId || null,

          quantity: Number(item.quantity),

          price: Number(item.price),
        },
      });

      // VARIANT STOCK

      if (item.variantId) {
        await prisma.productVariant.update({
          where: {
            id: item.variantId,
          },

          data: {
            stock: {
              decrement: Number(item.quantity),
            },
          },
        });
      }

      // PRODUCT STOCK
      else {
        await prisma.product.update({
          where: {
            id: item.productId,
          },

          data: {
            stock: {
              decrement: Number(item.quantity),
            },
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,

        receipt: {
          orderId: order.id,

          customerName: customerName || "Walk-In Customer",

          customerPhone: shippingPhone || "",

          paymentMethod,

          subtotal,

          discount,

          total,

          createdAt: order.createdAt,

          items: items.map((item: any) => ({
            id: item.productId,

            name: item.name,

            quantity: Number(item.quantity),

            price: Number(item.price),

            total: Number(item.price) * Number(item.quantity),
          })),
        },
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error("POS SALE ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to create sale",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
