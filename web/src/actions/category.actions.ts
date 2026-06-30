"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { hasPermission } from "@/lib/auth";

// ========================
// CREATE CATEGORY
// ========================

export async function createCategory(formData: FormData) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // FORM

  const name = formData.get("name") as string;

  const slug = formData.get("slug") as string;

  const parentId = formData.get("parentId") as string;

  // VALIDATION

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  // DUPLICATE CHECK

  const existing = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    throw new Error("Category slug already exists");
  }

  // CREATE

  await prisma.category.create({
    data: {
      name,

      slug,

      parentId: parentId || null,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");

  revalidatePath("/shop");
}

// ========================
// UPDATE CATEGORY
// ========================

export async function updateCategory(formData: FormData) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // FORM

  const id = formData.get("id") as string;

  const name = formData.get("name") as string;

  const slug = formData.get("slug") as string;

  const parentId = formData.get("parentId") as string;

  // VALIDATION

  if (!id || !name || !slug) {
    throw new Error("Missing required fields");
  }

  // DUPLICATE SLUG CHECK

  const existing = await prisma.category.findFirst({
    where: {
      slug,

      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new Error("Slug already exists");
  }

  // PREVENT SELF PARENT

  if (id === parentId) {
    throw new Error("Category cannot be parent of itself");
  }

  // UPDATE

  await prisma.category.update({
    where: {
      id,
    },

    data: {
      name,

      slug,

      parentId: parentId || null,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");

  revalidatePath("/shop");
}

// ========================
// DELETE CATEGORY
// ========================

export async function deleteCategory(id: string) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // FIND OR CREATE UNCATEGORIZED

  const uncategorized = await prisma.category.upsert({
    where: {
      slug: "uncategorized",
    },

    update: {},

    create: {
      name: "Uncategorized",
      slug: "uncategorized",
    },
  });

  // PREVENT DELETING UNCATEGORIZED ITSELF

  if (id === uncategorized.id) {
    throw new Error("Cannot delete the Uncategorized category.");
  }

  // MOVE PRODUCTS

  await prisma.product.updateMany({
    where: {
      categoryId: id,
    },

    data: {
      categoryId: uncategorized.id,
    },
  });

  // MOVE CHILD CATEGORIES

  await prisma.category.updateMany({
    where: {
      parentId: id,
    },

    data: {
      parentId: uncategorized.id,
    },
  });

  // DELETE CATEGORY

  await prisma.category.delete({
    where: {
      id,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

// ========================
// GET CATEGORIES
// ========================

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      parent: {
        select: {
          id: true,

          name: true,

          slug: true,
        },
      },

      children: {
        select: {
          id: true,

          name: true,

          slug: true,
        },

        orderBy: {
          name: "asc",
        },
      },

      _count: {
        select: {
          products: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}

// ========================
// GET CATEGORY BY SLUG
// ========================

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: {
      slug,
    },

    include: {
      parent: true,

      children: true,
    },
  });
}
