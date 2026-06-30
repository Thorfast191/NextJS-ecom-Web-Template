"use server";

import { hasPermission } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { auth } from "@/auth";

import { revalidatePath } from "next/cache";

import { getProductPrice } from "@/lib/pricing";

// ========================
// CREATE ORDER
// ========================

interface CreateOrderInput {
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];

  shippingMethodId?: string;

  shippingCost: number;

  shippingAddress?: string;

  shippingPhone?: string;

  customerName?: string;

  customerEmail?: string;

  paymentMethod: string;

  // COUPON

  couponCode?: string;

  discount?: number;
}

export async function createOrder({
  items,
  shippingMethodId,
  shippingCost,
  shippingAddress,
  shippingPhone,
  customerName,
  customerEmail,
  paymentMethod,
  couponCode,
  discount = 0,
}: CreateOrderInput) {
  const session = await auth();

  let user = null;

  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  }

  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const order = await prisma.$transaction(async (tx) => {
    let subtotal = 0;

    const orderItems: {
      productId: string;
      variantId?: string | null;
      quantity: number;
      price: number;
    }[] = [];

    // ========================
    // VALIDATE PRODUCTS
    // ========================

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: {
          id: item.productId,
        },

        include: {
          variants: true,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.isArchived) {
        throw new Error(`${product.name} is unavailable`);
      }

      const pricing = getProductPrice(product);

      // ========================
      // VARIANT PRODUCT
      // ========================

      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);

        if (!variant) {
          throw new Error("Variant not found");
        }

        if (!variant.isActive) {
          throw new Error("Variant unavailable");
        }

        if (variant.stock < item.quantity) {
          throw new Error(
            `${product.name} (${variant.size || "-"}) only has ${
              variant.stock
            } left`,
          );
        }

        const finalPrice = variant.price ?? pricing.finalPrice;

        subtotal += finalPrice * item.quantity;

        orderItems.push({
          productId: product.id,
          variantId: variant.id,
          quantity: item.quantity,
          price: finalPrice,
        });
      }

      // ========================
      // SIMPLE PRODUCT
      // ========================
      else {
        if (product.stock < item.quantity) {
          throw new Error(`${product.name} only has ${product.stock} left`);
        }

        subtotal += pricing.finalPrice * item.quantity;

        orderItems.push({
          productId: product.id,
          variantId: null,
          quantity: item.quantity,
          price: pricing.finalPrice,
        });
      }
    }

    // ========================
    // TOTAL
    // ========================

    const total = Math.max(subtotal + shippingCost - discount, 0);

    // ========================
    // DEDUCT STOCK
    // ========================

    for (const item of items) {
      // VARIANT PRODUCT

      if (item.variantId) {
        const variant = await tx.productVariant.findUnique({
          where: {
            id: item.variantId,
          },
        });

        if (!variant) {
          throw new Error("Variant not found");
        }

        if (variant.stock < item.quantity) {
          throw new Error("Stock changed during checkout. Please try again.");
        }

        await tx.productVariant.update({
          where: {
            id: item.variantId,
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // SIMPLE PRODUCT
      else {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error("Stock changed during checkout. Please try again.");
        }

        await tx.product.update({
          where: {
            id: item.productId,
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    // ========================
    // CREATE ORDER
    // ========================

    const order = await tx.order.create({
      data: {
        userId: user?.id,

        customerName,

        customerEmail,

        shippingMethodId,

        shippingCost,

        shippingAddress,

        shippingPhone,

        paymentMethod: paymentMethod as any,

        couponCode,

        discount,

        total,

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });

    return order;
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/account/orders");

  return order;
}

// ========================
// GET ORDERS
// ========================

export async function getOrders(page = 1, search = "") {
  const allowed = await hasPermission("manage_orders");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const take = 10;

  const skip = (page - 1) * take;

  return prisma.order.findMany({
    where: {
      ...(search && {
        OR: [
          {
            id: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            customerName: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            customerEmail: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            shippingPhone: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    take,

    skip,

    select: {
      id: true,

      total: true,

      discount: true,

      couponCode: true,

      status: true,

      paymentMethod: true,

      shippingAddress: true,

      shippingPhone: true,

      shippingCost: true,

      customerName: true,

      customerEmail: true,

      isPaid: true,

      createdAt: true,

      user: {
        select: {
          name: true,
          email: true,
        },
      },

      items: {
        select: {
          id: true,

          quantity: true,

          price: true,

          product: {
            select: {
              name: true,
              imageUrl: true,
            },
          },

          variant: {
            select: {
              size: true,
              color: true,
              sku: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

// ========================
// UPDATE ORDER STATUS
// ========================

export async function updateOrderStatus(formData: FormData) {
  const allowed = await hasPermission("manage_orders");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  const status = formData.get("status") as any;

  await prisma.order.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
}
