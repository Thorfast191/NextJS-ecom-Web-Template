import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { desktopCors } from "@/lib/desktop-cors";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const variants = body.variants || [];

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
          headers: desktopCors,
        },
      );
    }

    await prisma.$transaction(async (tx) => {
      const existingVariants = await tx.productVariant.findMany({
        where: {
          productId: id,
        },
      });

      const incomingIds = variants
        .filter((variant: any) => variant.id)
        .map((variant: any) => variant.id);

      // =========================
      // DELETE REMOVED VARIANTS
      // =========================

      for (const existing of existingVariants) {
        if (incomingIds.includes(existing.id)) continue;

        const orderCount = await tx.orderItem.count({
          where: {
            variantId: existing.id,
          },
        });

        let saleCount = 0;

        try {
          saleCount = await tx.saleItem.count({
            where: {
              variantId: existing.id,
            } as any,
          });
        } catch {
          saleCount = 0;
        }

        if (orderCount > 0 || saleCount > 0) {
          await tx.productVariant.update({
            where: {
              id: existing.id,
            },

            data: {
              isActive: false,
            },
          });
        } else {
          await tx.productVariant.delete({
            where: {
              id: existing.id,
            },
          });
        }
      }

      // =========================
      // UPDATE EXISTING VARIANTS
      // =========================

      for (const variant of variants) {
        if (!variant.id) continue;

        await tx.productVariant.update({
          where: {
            id: variant.id,
          },

          data: {
            size: variant.size || null,

            color: variant.color || null,

            sku: variant.sku?.trim() || null,

            barcode: variant.barcode?.trim() || null,

            stock: Math.max(0, Number(variant.stock || 0)),

            price: variant.price ? Number(variant.price) : null,

            comparePrice: variant.comparePrice
              ? Number(variant.comparePrice)
              : null,

            imageUrl: variant.imageUrl || null,

            isActive: variant.isActive === undefined ? true : variant.isActive,
          },
        });
      }

      // =========================
      // CREATE NEW VARIANTS
      // =========================

      for (const variant of variants) {
        if (variant.id) continue;

        await tx.productVariant.create({
          data: {
            productId: id,

            size: variant.size || null,

            color: variant.color || null,

            sku: variant.sku?.trim() || null,

            barcode: variant.barcode?.trim() || null,

            stock: Math.max(0, Number(variant.stock || 0)),

            price: variant.price ? Number(variant.price) : null,

            comparePrice: variant.comparePrice
              ? Number(variant.comparePrice)
              : null,

            imageUrl: variant.imageUrl || null,

            isActive: true,
          },
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error("UPDATE VARIANTS ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to update variants",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
