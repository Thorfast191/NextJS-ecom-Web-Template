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
    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },

          take: 1,
        },

        variants: {
          where: {
            isActive: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });

    const labels: any[] = [];

    for (const product of products) {
      // PRODUCT LABEL

      if (product.variants.length === 0) {
        labels.push({
          id: product.id,

          type: "product",

          productId: product.id,

          variantId: null,

          name: product.name,

          variantName: "-",

          barcode: product.barcode || product.sku || product.id,

          sku: product.sku,

          stock: product.stock,

          price: product.price,

          image: product.images[0]?.imageUrl ?? product.imageUrl ?? null,
        });

        continue;
      }

      // VARIANT LABELS

      for (const variant of product.variants) {
        labels.push({
          id: variant.id,

          type: "variant",

          productId: product.id,

          variantId: variant.id,

          name: product.name,

          variantName: `${variant.color || "-"} / ${variant.size || "-"}`,

          barcode: variant.barcode || variant.sku || variant.id,

          sku: variant.sku,

          stock: variant.stock,

          price: variant.price ?? product.price,

          image:
            variant.imageUrl ??
            product.images[0]?.imageUrl ??
            product.imageUrl ??
            null,
        });
      }
    }

    return NextResponse.json(labels, {
      headers: desktopCors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch labels",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
