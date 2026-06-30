import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    barcode: string;
  }>;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { barcode } = await params;

    // =========================
    // PRODUCT BARCODE
    // =========================

    const product = await prisma.product.findFirst({
      where: {
        barcode,
        isArchived: false,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },

          take: 1,
        },

        variants: true,
      },
    });

    if (product) {
      // Products with variants must use variant barcodes

      if (product.variants.length > 0) {
        return NextResponse.json(
          {
            error: "This product uses variants. Please scan a variant barcode.",
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }

      if (product.stock <= 0) {
        return NextResponse.json(
          {
            error: `${product.name} is out of stock`,
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }

      return NextResponse.json(
        {
          productId: product.id,

          variantId: null,

          type: "product",

          name: product.name,

          barcode: product.barcode,

          stock: product.stock,

          price: product.price,

          image: product.images[0]?.imageUrl ?? product.imageUrl ?? null,
        },
        {
          headers: desktopCors,
        },
      );
    }

    // =========================
    // VARIANT BARCODE
    // =========================

    const variant = await prisma.productVariant.findFirst({
      where: {
        barcode,
        isActive: true,
      },

      include: {
        product: {
          include: {
            images: {
              orderBy: {
                sortOrder: "asc",
              },

              take: 1,
            },
          },
        },
      },
    });

    if (variant) {
      if (variant.stock <= 0) {
        return NextResponse.json(
          {
            error: `${variant.product.name} (${variant.size || "-"}) is out of stock`,
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }

      return NextResponse.json(
        {
          id: variant.id,

          productId: variant.productId,

          variantId: variant.id,

          type: "variant",

          name: variant.product.name,

          barcode: variant.barcode,

          size: variant.size,

          color: variant.color,

          stock: variant.stock,

          price: variant.price ?? variant.product.price,

          image:
            variant.imageUrl ??
            variant.product.images[0]?.imageUrl ??
            variant.product.imageUrl ??
            null,
        },
        {
          headers: desktopCors,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Product not found",
      },
      {
        status: 404,
        headers: desktopCors,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
