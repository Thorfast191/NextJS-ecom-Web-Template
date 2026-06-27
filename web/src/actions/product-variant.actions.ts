"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasPermission } from "@/lib/auth";

export async function updateProductVariants(
  productId: string,
  variants: any[],
) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const existingVariants = await prisma.productVariant.findMany({
    where: {
      productId,
    },
  });

  const incomingIds = variants.filter((v) => v.id).map((v) => v.id);

  // delete removed variants

  for (const existing of existingVariants) {
    if (!incomingIds.includes(existing.id)) {
      const orderCount = await prisma.orderItem.count({
        where: {
          variantId: existing.id,
        },
      });

      if (orderCount > 0) {
        await prisma.productVariant.update({
          where: {
            id: existing.id,
          },
          data: {
            isActive: false,
          },
        });
      } else {
        await prisma.productVariant.delete({
          where: {
            id: existing.id,
          },
        });
      }
    }
  }

  // update existing variants

  for (const variant of variants) {
    if (!variant.id) continue;

    await prisma.productVariant.update({
      where: {
        id: variant.id,
      },

      data: {
        size: variant.size || null,
        color: variant.color || null,

        sku: variant.sku?.trim() || null,
        barcode: variant.barcode?.trim() || null,

        stock: Number(variant.stock) || 0,

        price: variant.price ? Number(variant.price) : null,

        comparePrice: variant.comparePrice
          ? Number(variant.comparePrice)
          : null,

        imageUrl: variant.imageUrl || null,

        isActive: true,
      },
    });
  }

  // create new variants

  for (const variant of variants) {
    if (variant.id) continue;

    await prisma.productVariant.create({
      data: {
        productId,

        size: variant.size || null,
        color: variant.color || null,

        sku: variant.sku?.trim() || null,
        barcode: variant.barcode?.trim() || null,

        stock: Number(variant.stock) || 0,

        price: variant.price ? Number(variant.price) : null,

        comparePrice: variant.comparePrice
          ? Number(variant.comparePrice)
          : null,

        imageUrl: variant.imageUrl || null,

        isActive: true,
      },
    });
  }

  revalidatePath("/admin/products");
}
