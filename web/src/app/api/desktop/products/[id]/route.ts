import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
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
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },

        variants: true,

        category: true,
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

    return NextResponse.json(product, {
      headers: desktopCors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load product",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
