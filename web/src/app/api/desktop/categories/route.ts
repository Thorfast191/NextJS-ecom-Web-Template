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
    const categories = await prisma.category.findMany({
      include: {
        children: {
          orderBy: {
            name: "asc",
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories, {
      headers: desktopCors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load categories",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
