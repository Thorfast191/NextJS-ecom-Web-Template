"use server";

import bcrypt from "bcryptjs";

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;

  const email = formData.get("email") as string;

  await prisma.user.update({
    where: {
      email: session.user.email,
    },

    data: {
      name,
      email,
    },
  });

  revalidatePath("/admin/settings");
}

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const currentPassword = formData.get("currentPassword") as string;

  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(currentPassword, user.password);

  if (!valid) {
    throw new Error("Incorrect password");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      password: hashed,
    },
  });

  revalidatePath("/admin/settings");
}
