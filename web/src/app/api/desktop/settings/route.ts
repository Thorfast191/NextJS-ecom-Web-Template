import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { desktopCors } from "@/lib/desktop-cors";

export async function GET() {
  const settings = await prisma.storeSettings.findFirst();

  return NextResponse.json(settings, {
    headers: desktopCors,
  });
}
