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
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      items: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(orders, {
    headers: desktopCors,
  });
}
