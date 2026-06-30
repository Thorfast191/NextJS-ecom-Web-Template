import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, currentPassword, newPassword } = body;

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user?.password) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
          headers: desktopCors,
        },
      );
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to change password",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
