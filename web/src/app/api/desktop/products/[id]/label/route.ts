import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { desktopCors } from "@/lib/desktop-cors";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    return NextResponse.json(
      {
        id: product.id,
        name: product.name,
        barcode: product.barcode,
        sku: product.sku,
        price: product.price,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load label",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
