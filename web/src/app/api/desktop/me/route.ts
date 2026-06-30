import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const email = req.headers.get("x-user-email");

  if (!email) {
    return NextResponse.json(null);
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(user);
}
