import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

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
    const images = body.images || [];

    if (!body.categoryId) {
      return NextResponse.json(
        {
          error: "Category is required",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },

      include: {
        variants: true,
        images: true,
      },
    });

    if (!existingProduct) {
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

    // =========================
    // DUPLICATE SKU/BARCODE CHECK
    // =========================

    for (const variant of variants) {
      const sku = variant.sku?.trim();

      const barcode = variant.barcode?.trim();

      if (sku) {
        const existingSku = await prisma.productVariant.findFirst({
          where: {
            sku,

            ...(variant.id
              ? {
                  NOT: {
                    id: variant.id,
                  },
                }
              : {}),
          },
        });

        if (existingSku) {
          return NextResponse.json(
            {
              error: `Variant SKU already exists: ${sku}`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }

      if (barcode) {
        const existingBarcode = await prisma.productVariant.findFirst({
          where: {
            barcode,

            ...(variant.id
              ? {
                  NOT: {
                    id: variant.id,
                  },
                }
              : {}),
          },
        });

        if (existingBarcode) {
          return NextResponse.json(
            {
              error: `Variant barcode already exists: ${barcode}`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }
    }

    const imageUrl =
      images.length > 0
        ? typeof images[0] === "string"
          ? images[0]
          : images[0]?.imageUrl
        : null;

    // =========================
    // PRODUCT UPDATE
    // =========================

    await prisma.product.update({
      where: {
        id,
      },

      data: {
        name: body.name,

        slug: body.slug,

        description: body.description || null,

        sku: body.sku?.trim() || null,

        barcode: body.barcode?.trim() || null,

        price: Number(body.price || 0),

        comparePrice: body.comparePrice ? Number(body.comparePrice) : null,

        stock: variants.length > 0 ? 0 : Math.max(0, Number(body.stock || 0)),

        categoryId: body.categoryId,

        gender: body.gender,

        discountType: body.discountType || null,

        discountValue: body.discountValue ? Number(body.discountValue) : null,

        discountStartAt:
          body.discountStartAt && body.discountStartAt !== ""
            ? new Date(body.discountStartAt)
            : null,

        discountEndAt:
          body.discountEndAt && body.discountEndAt !== ""
            ? new Date(body.discountEndAt)
            : null,

        imageUrl,
      },
    });

    // =========================
    // IMAGES
    // =========================

    await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    if (images.length > 0) {
await prisma.productImage.createMany({
  data: images.map((image: string, index: number) => ({
    productId: id,
    imageUrl: image,
    sortOrder: index,
  })),
});
    }

    // =========================
    // DELETE REMOVED VARIANTS
    // =========================

    const incomingIds = variants.filter((v: any) => v.id).map((v: any) => v.id);

    const variantsToDelete = existingProduct.variants.filter(
      (variant) => !incomingIds.includes(variant.id),
    );

    for (const variant of variantsToDelete) {
      const usedInOrders = await prisma.orderItem.count({
        where: {
          variantId: variant.id,
        },
      });

      if (usedInOrders > 0) {
        await prisma.productVariant.update({
          where: {
            id: variant.id,
          },

          data: {
            isActive: false,
          },
        });
      } else {
        await prisma.productVariant.delete({
          where: {
            id: variant.id,
          },
        });
      }
    }

    // =========================
    // UPSERT VARIANTS
    // =========================

    for (const variant of variants) {
      if (variant.id) {
        await prisma.productVariant.update({
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
      } else {
        await prisma.productVariant.create({
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
    }

    const updatedProduct = await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        variants: true,
        images: true,
      },
    });

    return NextResponse.json(updatedProduct, {
      headers: desktopCors,
    });
  } catch (error: any) {
    console.error("PRODUCT UPDATE ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to update product",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
