"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function seedAdmin() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@poshmanstyle.com",
    },
  });

  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin",

      email: "admin@poshmanstyle.com",

      password: hashedPassword,

      role: "ADMIN",
    },
  });
}
