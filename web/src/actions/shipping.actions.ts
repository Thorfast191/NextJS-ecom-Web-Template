"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { hasPermission } from "@/lib/auth";

// ======================
// CREATE
// ======================

export async function createShippingMethod(formData: FormData) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;

  const price = Number(formData.get("price"));

  const estimatedDays = formData.get("estimatedDays") as string;

  const isPickup = formData.get("isPickup") === "on";

  await prisma.shippingMethod.create({
    data: {
      name,
      price,
      estimatedDays,
      isPickup,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// UPDATE
// ======================

export async function updateShippingMethod(formData: FormData) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  const name = formData.get("name") as string;

  const price = Number(formData.get("price"));

  const estimatedDays = formData.get("estimatedDays") as string;

  const isPickup = formData.get("isPickup") === "on";

  const isActive = formData.get("isActive") === "on";

  await prisma.shippingMethod.update({
    where: {
      id,
    },

    data: {
      name,
      price,
      estimatedDays,
      isPickup,
      isActive,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// DELETE
// ======================

export async function deleteShippingMethod(id: string) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  await prisma.shippingMethod.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// GET
// ======================

export async function getShippingMethods() {
  return prisma.shippingMethod.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getActiveShippingMethods() {
  return prisma.shippingMethod.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}
