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
      name,
      slug,
      description,

      sku,
      barcode,

      price,
      comparePrice,

      stock,

      imageUrl,
      images = [],

      categoryId,

      gender,

      discountType,
      discountValue,
      discountStartAt,
      discountEndAt,

      variants = [],
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400, headers: desktopCors },
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400, headers: desktopCors },
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400, headers: desktopCors },
      );
    }

    const cleanSku = sku?.trim() || null;
    const cleanBarcode = barcode?.trim() || null;

    // SLUG CHECK

    const existingSlug = await prisma.product.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          error: "Slug already exists",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    // PRODUCT SKU CHECK

    if (cleanSku) {
      const existingSku = await prisma.product.findFirst({
        where: {
          sku: cleanSku,
        },
      });

      if (existingSku) {
        return NextResponse.json(
          {
            error: "SKU already exists",
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }
    }

    // PRODUCT BARCODE CHECK

    if (cleanBarcode) {
      const existingBarcode = await prisma.product.findFirst({
        where: {
          barcode: cleanBarcode,
        },
      });

      if (existingBarcode) {
        return NextResponse.json(
          {
            error: "Barcode already exists",
          },
          {
            status: 400,
            headers: desktopCors,
          },
        );
      }
    }

    // VARIANT DUPLICATE CHECKS

    for (const variant of variants) {
      const variantSku = variant?.sku?.trim();

      const variantBarcode = variant?.barcode?.trim();

      if (variantSku) {
        const existingVariantSku = await prisma.productVariant.findFirst({
          where: {
            sku: variantSku,
          },
        });

        if (existingVariantSku) {
          return NextResponse.json(
            {
              error: `Variant SKU already exists: ${variantSku}`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }

      if (variantBarcode) {
        const existingVariantBarcode = await prisma.productVariant.findFirst({
          where: {
            barcode: variantBarcode,
          },
        });

        if (existingVariantBarcode) {
          return NextResponse.json(
            {
              error: `Variant barcode already exists: ${variantBarcode}`,
            },
            {
              status: 400,
              headers: desktopCors,
            },
          );
        }
      }
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),

        slug: slug.trim(),

        description: description || null,

        sku: cleanSku,

        barcode: cleanBarcode,

        price: Number(price || 0),

        comparePrice: comparePrice ? Number(comparePrice) : null,

        stock: Number(stock || 0),

        imageUrl: imageUrl || images?.[0] || null,

        categoryId,

        gender: gender || "UNISEX",

        discountType: discountType || null,

        discountValue: discountValue ? Number(discountValue) : null,

        discountStartAt: discountStartAt ? new Date(discountStartAt) : null,

        discountEndAt: discountEndAt ? new Date(discountEndAt) : null,

        images: {
          create: images.map((image: string, index: number) => ({
            imageUrl: image,
            sortOrder: index,
          })),
        },

        variants: {
          create: variants.map((variant: any) => ({
            size: variant.size || null,

            color: variant.color || null,

            sku: variant.sku?.trim() || null,

            barcode: variant.barcode?.trim() || null,

            imageUrl: variant.imageUrl || null,

            stock: Number(variant.stock || 0),

            price: variant.price ? Number(variant.price) : null,

            comparePrice: variant.comparePrice
              ? Number(variant.comparePrice)
              : null,

            isActive: variant.isActive === undefined ? true : variant.isActive,
          })),
        },
      },

      include: {
        images: true,
        variants: true,
      },
    });

    return NextResponse.json(product, {
      headers: desktopCors,
    });
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to create product",
        meta: error?.meta || null,
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
