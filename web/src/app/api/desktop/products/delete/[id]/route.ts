import { prisma } from "@/lib/prisma";
import { desktopCors } from "@/lib/desktop-cors";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.product.update({
      where: {
        id,
      },

      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product archived successfully",
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error("ARCHIVE PRODUCT ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to archive product",
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
