import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
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

    if (!user || !user.password) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
          headers: desktopCors,
        },
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
          headers: desktopCors,
        },
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Admin access only",
        },
        {
          status: 403,
          headers: desktopCors,
        },
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.AUTH_SECRET!,
      {
        expiresIn: "30d",
      },
    );

    return NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
