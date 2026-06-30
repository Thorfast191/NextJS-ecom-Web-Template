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
    const { code, amount } = await req.json();

    if (!code) {
      return NextResponse.json(
        {
          error: "Coupon code required",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.trim().toUpperCase(),
      },
    });

    if (!coupon) {
      return NextResponse.json(
        {
          error: "Invalid coupon",
        },
        {
          status: 404,
          headers: desktopCors,
        },
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        {
          error: "Coupon is inactive",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        {
          error: "Coupon expired",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    if (coupon.minAmount && Number(amount) < coupon.minAmount) {
      return NextResponse.json(
        {
          error: `Minimum order amount is ৳${coupon.minAmount}`,
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    let discount = 0;

    if (coupon.type === "PERCENTAGE") {
      discount = (Number(amount) * coupon.value) / 100;
    } else {
      discount = coupon.value;
    }

    if (discount > Number(amount)) {
      discount = Number(amount);
    }

    return NextResponse.json(
      {
        valid: true,
        code: coupon.code,
        discount,
        finalTotal: Number(amount) - discount,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to validate coupon",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
