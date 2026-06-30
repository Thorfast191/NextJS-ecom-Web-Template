import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { desktopCors } from "@/lib/desktop-cors";

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
        variants: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedProducts = products.map((product) => {
      const hasVariants = product.variants.length > 0;

      const stock = hasVariants
        ? product.variants.reduce((sum, variant) => sum + variant.stock, 0)
        : product.stock;

      return {
        id: product.id,

        name: product.name,

        barcode: product.barcode,

        sku: product.sku,

        price: product.price,

        imageUrl: product.imageUrl,

        stock,

        variantCount: product.variants.length,

        variants: product.variants.map((variant) => ({
          id: variant.id,

          size: variant.size,

          color: variant.color,

          sku: variant.sku,

          barcode: variant.barcode,

          stock: variant.stock,

          price: variant.price,

          comparePrice: variant.comparePrice,
        })),
      };
    });

    return NextResponse.json(formattedProducts, {
      headers: desktopCors,
    });
  } catch (error) {
    console.error("PRODUCTS LOAD ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load products",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
